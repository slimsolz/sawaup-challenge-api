import request from "supertest";
import app from "../app";

describe("main routes", () => {
  it("returns welcome message", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "online courses API");
  });

  it("returns an error for invalid routes", async () => {
    const res = await request(app).get("/api/v1/xyz");
    expect(res).toHaveProperty("status", 404);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "404 route not found.");
  });
});
