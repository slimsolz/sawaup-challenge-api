"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = require("@faker-js/faker");
const app_1 = __importDefault(require("../app"));
let skillId;
const data = {
    name: faker_1.faker.lorem.slug(1),
};
describe("SKILLS TESTS", () => {
    it("I should be able to create a new skill", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/v1/skills").send(data);
        skillId = res.body.data.id;
        expect(res).toHaveProperty("status", 201);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "skill added successfully");
    });
    it("I should not be able to create a duplicate skill", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/v1/skills").send(data);
        expect(res).toHaveProperty("status", 409);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "skill already exists");
    });
    it("I should not be able to create a skill if validation fails", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/v1/skills").send({});
        expect(res).toHaveProperty("status", 422);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "name is required");
    });
    it("I should be able to get all skills", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/v1/skills");
        expect(res).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "skills retrieved");
    });
    it("I should be able to get skills with filter for name", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/skills?name=${data.name}`);
        expect(res).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "skills retrieved");
    });
    it("I should be able to get a skill", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/skills/${skillId}`);
        expect(res).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "skill retrieved");
    });
    it("I should fail to get a skill that doesn't exist", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/v1/skills/10001");
        expect(res).toHaveProperty("status", 404);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "No Skill found");
    });
    it("I should be able to update a skill", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/v1/skills/${skillId}`)
            .send({ name: faker_1.faker.lorem.slug(1) });
        expect(res).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "skill updated");
    });
    it("I should fail to update a skill that doesn't exist", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put("/api/v1/skills/10001")
            .send({ name: faker_1.faker.lorem.slug(1) });
        expect(res).toHaveProperty("status", 404);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "skill not found");
    });
    it("I should fail to update a skill if validation fails", async () => {
        const res = await (0, supertest_1.default)(app_1.default).put(`/api/v1/skills/${skillId}`).send({});
        expect(res).toHaveProperty("status", 422);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "name is required");
    });
    it("I should be able to remove a skill", async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete(`/api/v1/skills/${skillId}`);
        expect(res).toHaveProperty("status", 204);
    });
    it("I should fail to delete a skill that doesn't exist", async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete("/api/v1/skills/10001");
        expect(res).toHaveProperty("status", 404);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "skill not found");
    });
});
//# sourceMappingURL=skill.test.js.map