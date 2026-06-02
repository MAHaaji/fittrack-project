import { jest } from "@jest/globals";
import request from "supertest";

// Replace the real "pg" library with a fake one BEFORE we load the app.
// The fake Pool just records query() calls; no real database is touched.
const mockQuery = jest.fn();
jest.unstable_mockModule("pg", () => ({
  Pool: jest.fn(() => ({ query: mockQuery, connect: jest.fn() })),
}));

// Because we mocked pg above, we must import the app dynamically (after the mock).
const { app } = await import("../app.js");

describe("GET /api/health", () => {
  it("returns 200 and a status of ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});