"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@tiffin.com' },
        update: {},
        create: {
            email: 'demo@tiffin.com',
            name: 'Demo User',
            passwordHash: hashedPassword,
            role: 'USER',
        },
    });
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@tiffin.com' },
        update: {},
        create: {
            email: 'admin@tiffin.com',
            name: 'Admin User',
            passwordHash: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('Seeded users:', { demoUser, adminUser });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map