"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseUtil_1 = require("../helpers/responseUtil");
exports.default = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error)
        return next();
    const { details } = error;
    const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
    return (0, responseUtil_1.errorResponse)(res, 422, message);
};
//# sourceMappingURL=validation.middleware.js.map