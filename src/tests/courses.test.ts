import request from "supertest";
import { faker } from "@faker-js/faker";

import app from "../app";

let courseId: number;
const data = {
  name: faker.lorem.slug(1),
  url: faker.internet.url(),
  thumbnail: faker.image.imageUrl(),
  skills: [1, 2, 3, 4],
};

describe("COURSES TESTS", () => {
  it("I should not be able to create a new course if validation fails", async () => {
    const res = await request(app).post("/api/v1/courses").send({});
    expect(res).toHaveProperty("status", 422);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "name is required");
  });

  it("I should be able to create a new course", async () => {
    const res = await request(app).post("/api/v1/courses").send(data);
    courseId = res.body.data.id;
    expect(res).toHaveProperty("status", 201);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "course added successfully");
  });

  it("I should not be able to create a new course if url already exists", async () => {
    const res = await request(app).post("/api/v1/courses").send(data);
    expect(res).toHaveProperty("status", 409);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty(
      "message",
      "course with url already exists"
    );
  });

  it("I should be able to get all courses", async () => {
    const res = await request(app).get("/api/v1/courses");
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "courses retrieved");
  });

  it("I should be able to get all courses filtered by skills", async () => {
    const skills = JSON.stringify([2]);
    const res = await request(app).get(`/api/v1/courses?ids=${skills}`);
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "courses retrieved");
  });

  it("I should fail to delete a course that doesn't exist", async () => {
    const res = await request(app).delete("/api/v1/courses/10001");
    expect(res).toHaveProperty("status", 404);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "course not found");
  });

  it("I should fail to get a course that doesn't exist", async () => {
    const res = await request(app).get("/api/v1/courses/10001");
    expect(res).toHaveProperty("status", 404);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "No Course found");
  });

  it("I should be able to get a course", async () => {
    const res = await request(app).get(`/api/v1/courses/${courseId}`);
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("message", "course retrieved");
  });

  it("I should fail to favorite a course that doesn't exist", async () => {
    const res = await request(app).post("/api/v1/courses/favorite/10001");
    expect(res).toHaveProperty("status", 404);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "course not found");
  });

  it("I should be able to favorite a course", async () => {
    const res = await request(app)
      .post(`/api/v1/courses/favorite/${courseId}`)
      .send({ name: "Guest100" });
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "added to favorite");
  });

  it("I should be able to get all courses with user like", async () => {
    const res = await request(app).get("/api/v1/courses?user=Guest100");
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "courses retrieved");
  });

  it("I should be able to get all courses with user like", async () => {
    const res = await request(app).get("/api/v1/courses?user=Guest101");
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "courses retrieved");
  });

  it("I should be able to  unfavorite a course", async () => {
    const res = await request(app)
      .post(`/api/v1/courses/favorite/${courseId}`)
      .send({ name: "Guest100" });
    expect(res).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "removed from favorite");
  });

  it("I should be able to remove a course", async () => {
    const res = await request(app).delete(`/api/v1/courses/${courseId}`);
    expect(res).toHaveProperty("status", 204);
  });
});
