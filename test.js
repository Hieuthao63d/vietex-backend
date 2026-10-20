"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./src/db");
async function main() {
    const p = await db_1.prisma.product.findMany({
        include: { images: { orderBy: { sortOrder: 'asc' } } }
    });
    console.log(JSON.stringify(p.map(x => ({ name: x.name, images: x.images })), null, 2));
    console.log(JSON.stringify(p?.images, null, 2));
}
main();
//# sourceMappingURL=test.js.map