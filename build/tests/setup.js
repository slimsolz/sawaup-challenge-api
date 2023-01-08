"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const skillInput = [
    {
        name: faker_1.faker.lorem.slug(1),
    },
    {
        name: faker_1.faker.lorem.slug(1),
    },
    {
        name: faker_1.faker.lorem.slug(1),
    },
    {
        name: faker_1.faker.lorem.slug(1),
    },
];
beforeAll(async () => {
    await prisma.skill.createMany({
        data: skillInput,
    });
});
//# sourceMappingURL=setup.js.map