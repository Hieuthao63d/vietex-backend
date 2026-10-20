"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../src/db");
async function main() {
    const username = 'admin';
    const password = 'adminpassword123';
    // Check if admin already exists
    const existingAdmin = await db_1.prisma.user.findUnique({
        where: { username }
    });
    if (existingAdmin) {
        console.log('Admin account already exists.');
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const passwordHash = await bcryptjs_1.default.hash(password, salt);
    await db_1.prisma.user.create({
        data: {
            username,
            passwordHash,
            role: client_1.Role.ADMIN,
        }
    });
    console.log('Admin account created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map