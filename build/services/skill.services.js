"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillExists = exports.updateSkill = exports.deleteSkill = exports.getSkill = exports.getAllSkills = exports.addNewSkill = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addNewSkill(input) {
    return await prisma.skill.create({
        data: { ...input },
    });
}
exports.addNewSkill = addNewSkill;
async function getAllSkills(name) {
    let filter = {};
    if (name) {
        filter = { where: { name } };
    }
    return await prisma.skill.findMany(filter);
}
exports.getAllSkills = getAllSkills;
async function getSkill(id) {
    return await prisma.skill.findFirstOrThrow({ where: { id } });
}
exports.getSkill = getSkill;
async function deleteSkill(id) {
    return await prisma.skill.delete({ where: { id } });
}
exports.deleteSkill = deleteSkill;
async function updateSkill(id, input) {
    return await prisma.skill.update({ where: { id }, data: { ...input } });
}
exports.updateSkill = updateSkill;
async function skillExists(input) {
    let filter = {};
    if (typeof input === "number") {
        filter = { id: input };
    }
    else if (typeof input === "string") {
        filter = { name: input };
    }
    return await prisma.skill.count({
        where: filter,
    });
}
exports.skillExists = skillExists;
//# sourceMappingURL=skill.services.js.map