"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3002;
app_1.default.set("port", port);
app_1.default.listen(port, () => {
    console.log(`App started on port ${port}`);
});
exports.default = app_1.default;
//# sourceMappingURL=index.js.map