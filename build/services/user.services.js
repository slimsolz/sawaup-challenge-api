"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findUser = exports.addGuestUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addGuestUser(input) {
    return await prisma.user.create({
        data: { ...input },
    });
}
exports.addGuestUser = addGuestUser;
async function findUser(name) {
    return await prisma.user.findFirst({
        where: { name },
    });
}
exports.findUser = findUser;
async function deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.services.js.map