"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const routes_1 = __importDefault(require("./routes"));
const responseUtil_1 = require("./helpers/responseUtil");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const swaggerDocument = yamljs_1.default.load(`${process.cwd()}/src/swagger.yaml`);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api/v1/", routes_1.default);
app.use((err, req, res, next) => {
    if (err.name === "NotFoundError") {
        return (0, responseUtil_1.errorResponse)(res, 404, err.message);
    }
    return (0, responseUtil_1.errorResponse)(res, 500, "Internal Error");
});
exports.default = app;
//# sourceMappingURL=app.js.map