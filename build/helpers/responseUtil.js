"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
/**
 * Error response
 *
 * @param  {string} message - error string
 * @param  {Integer} statusCode - status code
 * @param {any} res - expressJS response object
 * @returns {object} response object
 */
const errorResponse = (res, statusCode, message) => res.status(statusCode).json({
    status: "error",
    message,
});
exports.errorResponse = errorResponse;
/**
 * Success response
 *
 * @param  {string} message - response message
 * @param  {Integer} statusCode - status code
 * @param {Array} response - data object
 * @returns {object} response object
 */
const successResponse = (res, statusCode, message, data = null) => res.status(statusCode).json({
    status: "success",
    message,
    data,
});
exports.successResponse = successResponse;
//# sourceMappingURL=responseUtil.js.map