"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("main routes", () => {
    it("returns welcome message", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/v1/");
        expect(res).toHaveProperty("status", 200);
        expect(res.body).toHaveProperty("status", "success");
        expect(res.body).toHaveProperty("message", "online courses API");
    });
    it("returns an error for invalid routes", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/v1/xyz");
        expect(res).toHaveProperty("status", 404);
        expect(res.body).toHaveProperty("status", "error");
        expect(res.body).toHaveProperty("message", "404 route not found.");
    });
});
//# sourceMappingURL=main.test.js.map