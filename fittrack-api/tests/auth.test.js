import { jest } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcrypt";

const mockQuery = jest.fn();
jest.unstable_mockModule("pg", () => ({
  Pool: jest.fn(() => ({ query: mockQuery, connect: jest.fn() })),
}));

const { app } = await import("../app.js");

beforeEach(() => {
  mockQuery.mockReset();
});

describe("POST /api/auth/register", () => {
  it("rejects a missing name with 400", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "a@b.com", password: "password123" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/name/i);
  });

  it("rejects an invalid email with 400", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Sam", email: "not-an-email", password: "password123" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it("rejects a password shorter than 8 chars with 400", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Sam", email: "a@b.com", password: "short" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/8 characters/i);
  });

  it("rejects an already-registered email with 409", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Sam", email: "taken@b.com", password: "password123" });
    expect(res.status).toBe(409);
  });

  it("creates a new user and returns 201", async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] }) // no existing user
      .mockResolvedValueOnce({ rows: [{ id: 5, name: "Sam", email: "sam@b.com" }] }); // insert
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Sam", email: "sam@b.com", password: "password123" });
    expect(res.status).toBe(201);
    expect(res.body.user).toEqual({ id: 5, name: "Sam", email: "sam@b.com" });
  });
});

describe("POST /api/auth/login", () => {
  it("rejects missing credentials with 400", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("rejects an unknown email with 401", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@b.com", password: "password123" });
    expect(res.status).toBe(401);
  });

  it("rejects a wrong password with 401", async () => {
    const hash = await bcrypt.hash("correct-password", 10);
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: "Sam", email: "sam@b.com", password_hash: hash }],
    });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "sam@b.com", password: "wrong-password" });
    expect(res.status).toBe(401);
  });

  it("logs in with correct credentials and returns a token", async () => {
    const hash = await bcrypt.hash("correct-password", 10);
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: "Sam", email: "sam@b.com", password_hash: hash }],
    });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "sam@b.com", password: "correct-password" });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.user).toEqual({ id: 1, name: "Sam", email: "sam@b.com" });
  });
});