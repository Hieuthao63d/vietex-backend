"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./src/db");
async function main() {
    const products = await db_1.prisma.product.findMany({
        select: { id: true, name: true, slug: true, origin: true, quality: true, packaging: true }
    });
    console.log("PRODUCTS COUNT:", products.length);
    console.log(JSON.stringify(products, null, 2));
}
main();
//# sourceMappingURL=check-products.js.map