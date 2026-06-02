import { jest } from "@jest/globals";
import request from "supertest";
import jwt from "jsonwebtoken";

const mockQuery = jest.fn();
jest.unstable_mockModule("pg", () => ({
  Pool: jest.fn(() => ({ query: mockQuery, connect: jest.fn() })),
}));

const { app } = await import("../app.js");

// A valid token for user id 1, signed with the same secret tests/setup.js sets.
const token = jwt.sign({ id: 1, email: "sam@b.com" }, "test_secret_key");
const auth = `Bearer ${token}`;

beforeEach(() => {
  mockQuery.mockReset();
});

describe("auth protection on /api/workouts", () => {
  it("blocks GET without a token (401)", async () => {
    const res = await request(app).get("/api/workouts");
    expect(res.status).toBe(401);
  });

  it("blocks POST without a token (401)", async () => {
    const res = await request(app).post("/api/workouts").send({ activity: "Run" });
    expect(res.status).toBe(401);
  });

  it("rejects a bad token (401)", async () => {
    const res = await request(app)
      .get("/api/workouts")
      .set("Authorization", "Bearer not-a-real-token");
    expect(res.status).toBe(401);
  });
});

describe("GET /api/workouts", () => {
  it("returns the user's workouts when authenticated", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, activity: "Run", duration: 30 }],
    });
    const res = await request(app).get("/api/workouts").set("Authorization", auth);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].activity).toBe("Run");
  });
});

describe("POST /api/workouts", () => {
  it("rejects a missing activity name with 400", async () => {
    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", auth)
      .send({ date_completed: "2025-01-01" });
    expect(res.status).toBe(400);
  });

  it("rejects an invalid date with 400", async () => {
    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", auth)
      .send({ activity: "Run", date_completed: "not-a-date" });
    expect(res.status).toBe(400);
  });

  it("rejects a non-positive duration with 400", async () => {
    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", auth)
      .send({ activity: "Run", date_completed: "2025-01-01", duration: -5 });
    expect(res.status).toBe(400);
  });

  it("creates a workout and returns 201", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 9, activity: "Run", date_completed: "2025-01-01", duration: 30 }],
    });
    const res = await request(app)
      .post("/api/workouts")
      .set("Authorization", auth)
      .send({ activity: "Run", date_completed: "2025-01-01", duration: 30 });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(9);
  });
});

describe("DELETE /api/workouts/:id", () => {
  it("rejects a non-numeric id with 400", async () => {
    const res = await request(app)
      .delete("/api/workouts/abc")
      .set("Authorization", auth);
    expect(res.status).toBe(400);
  });

  it("returns 404 when the workout does not exist", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const res = await request(app)
      .delete("/api/workouts/123")
      .set("Authorization", auth);
    expect(res.status).toBe(404);
  });

  it("returns 204 on a successful delete", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 123 }] });
    const res = await request(app)
      .delete("/api/workouts/123")
      .set("Authorization", auth);
    expect(res.status).toBe(204);
  });
});