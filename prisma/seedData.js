"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../src/db");
const categories = [
    { id: "canned-fruits", name: "Canned Fruits" },
    { id: "canned-vegetables", name: "Canned Vegetables" },
    { id: "dried-fruits", name: "Dried Fruits" },
    { id: "frozen-fruits", name: "Frozen Fruits" },
    { id: "fruit-juice-concentrates", name: "Fruit Juice / Concentrates" },
    { id: "fresh-fruits", name: "Fresh Fruits" },
    { id: "canned-fish", name: "Canned Fish" },
];
const products = [
    { slug: "canned-pineapple", name: "Canned Pineapple in Syrup", categorySlug: "canned-fruits", images: ["/images/products/canned-pineapple/canned-pineapple-1.png", "/images/products/canned-pineapple/canned-pineapple-2.png", "/images/products/canned-pineapple/canned-pineapple-3.png", "/images/products/canned-pineapple/canned-pineapple-4.png"] },
    { slug: "canned-mango", name: "Canned Mango in Syrup", categorySlug: "canned-fruits", images: ["/images/products/canned-mango/canned-mango-1.png", "/images/products/canned-mango/canned-mango-2.png", "/images/products/canned-mango/canned-mango-3.png", "/images/products/canned-mango/canned-mango-4.png"] },
    { slug: "canned-lychee", name: "Canned Lychee in Syrup", categorySlug: "canned-fruits", images: ["/images/products/canned-lychee/canned-lychee-1.png", "/images/products/canned-lychee/canned-lychee-2.png", "/images/products/canned-lychee/canned-lychee-3.png", "/images/products/canned-lychee/canned-lychee-4.png"] },
    { slug: "canned-longan", name: "Canned Longan in Syrup", categorySlug: "canned-fruits", images: ["/images/products/canned-longan/canned-longan-1.png", "/images/products/canned-longan/canned-longan-2.png", "/images/products/canned-longan/canned-longan-3.png", "/images/products/canned-longan/canned-longan-4.png"] },
    { slug: "canned-mushroom", name: "Canned Mushroom", categorySlug: "canned-vegetables", images: ["/images/products/canned-mushroom/canned-mushroom-1.png", "/images/products/canned-mushroom/canned-mushroom-2.png", "/images/products/canned-mushroom/canned-mushroom-3.png", "/images/products/canned-mushroom/canned-mushroom-4.png"] },
    { slug: "canned-cucumber", name: "Canned Cucumber", categorySlug: "canned-vegetables", images: ["/images/products/canned-cucumber/canned-cucumber-1.png", "/images/products/canned-cucumber/canned-cucumber-2.png", "/images/products/canned-cucumber/canned-cucumber-3.png", "/images/products/canned-cucumber/canned-cucumber-4.png"] },
    { slug: "canned-sweet-corns", name: "Canned Sweet Corns", categorySlug: "canned-vegetables", images: ["/images/products/canned-sweet-corns/canned-sweet-corns-1.png", "/images/products/canned-sweet-corns/canned-sweet-corns-2.png", "/images/products/canned-sweet-corns/canned-sweet-corns-3.png", "/images/products/canned-sweet-corns/canned-sweet-corns-4.png"] },
    { slug: "dried-mango", name: "Dried Mango (Keaw / Cat Chu)", categorySlug: "dried-fruits", images: ["/images/products/dried-mango/dried-mango-1.png", "/images/products/dried-mango/dried-mango-2.png", "/images/products/dried-mango/dried-mango-3.png", "/images/products/dried-mango/dried-mango-4.png"] },
    { slug: "frozen-mango", name: "Frozen Mango", categorySlug: "frozen-fruits", images: ["/images/products/frozen-mango/frozen-mango-1.png", "/images/products/frozen-mango/frozen-mango-2.png", "/images/products/frozen-mango/frozen-mango-3.png", "/images/products/frozen-mango/frozen-mango-4.png"] },
    { slug: "frozen-pineapple", name: "Frozen Pineapple", categorySlug: "frozen-fruits", images: ["/images/products/frozen-pineapple/frozen-pineapple-1.png", "/images/products/frozen-pineapple/frozen-pineapple-2.png", "/images/products/frozen-pineapple/frozen-pineapple-3.png", "/images/products/frozen-pineapple/frozen-pineapple-4.png"] },
    { slug: "frozen-lychee", name: "Frozen Lychee", categorySlug: "frozen-fruits", images: ["/images/products/frozen-lychee/frozen-lychee-1.png", "/images/products/frozen-lychee/frozen-lychee-2.png", "/images/products/frozen-lychee/frozen-lychee-3.png", "/images/products/frozen-lychee/frozen-lychee-4.png"] },
    { slug: "frozen-dragon-fruits", name: "Frozen Dragon Fruits", categorySlug: "frozen-fruits", images: ["/images/products/frozen-dragon-fruits/frozen-dragon-fruits-1.png", "/images/products/frozen-dragon-fruits/frozen-dragon-fruits-2.png", "/images/products/frozen-dragon-fruits/frozen-dragon-fruits-3.png", "/images/products/frozen-dragon-fruits/frozen-dragon-fruits-4.png"] },
    { slug: "frozen-passion-fruits-half", name: "Frozen Passion Fruits - Half", categorySlug: "frozen-fruits", images: ["/images/products/frozen-passion-fruits-half/frozen-passion-fruits-half-1.png", "/images/products/frozen-passion-fruits-half/frozen-passion-fruits-half-2.png", "/images/products/frozen-passion-fruits-half/frozen-passion-fruits-half-3.png", "/images/products/frozen-passion-fruits-half/frozen-passion-fruits-half-4.png"] },
    { slug: "frozen-passion-fruits", name: "Frozen Passion Fruits", categorySlug: "frozen-fruits", images: ["/images/products/frozen-passion-fruits/frozen-passion-fruits-1.png", "/images/products/frozen-passion-fruits/frozen-passion-fruits-2.png", "/images/products/frozen-passion-fruits/frozen-passion-fruits-3.png", "/images/products/frozen-passion-fruits/frozen-passion-fruits-4.png"] },
    { slug: "mango-puree", name: "Mango Puree", categorySlug: "fruit-juice-concentrates", images: ["/images/products/mango-puree/mango-puree-1.png", "/images/products/mango-puree/mango-puree-2.png", "/images/products/mango-puree/mango-puree-3.png", "/images/products/mango-puree/mango-puree-4.png"] },
    { slug: "pineapple-puree", name: "Pineapple Puree", categorySlug: "fruit-juice-concentrates", images: ["/images/products/pineapple-puree/pineapple-puree-1.png", "/images/products/pineapple-puree/pineapple-puree-2.png", "/images/products/pineapple-puree/pineapple-puree-3.png", "/images/products/pineapple-puree/pineapple-puree-4.png"] },
    { slug: "passion-fruits-puree", name: "Passion Fruits Puree", categorySlug: "fruit-juice-concentrates", images: ["/images/products/passion-fruits-puree/passion-fruits-puree-1.png", "/images/products/passion-fruits-puree/passion-fruits-puree-2.png", "/images/products/passion-fruits-puree/passion-fruits-puree-3.png", "/images/products/passion-fruits-puree/passion-fruits-puree-4.png"] },
    { slug: "mango-juice", name: "Mango Juice", categorySlug: "fruit-juice-concentrates", images: ["/images/products/mango-juice/mango-juice-1.png", "/images/products/mango-juice/mango-juice-2.png", "/images/products/mango-juice/mango-juice-3.png", "/images/products/mango-juice/mango-juice-4.png"] },
    { slug: "pineapple-juice", name: "Pineapple Juice", categorySlug: "fruit-juice-concentrates", images: ["/images/products/pineapple-juice/pineapple-juice-1.png", "/images/products/pineapple-juice/pineapple-juice-2.png", "/images/products/pineapple-juice/pineapple-juice-3.png", "/images/products/pineapple-juice/pineapple-juice-4.png"] },
    { slug: "passion-fruits-juice", name: "Passion Fruits Juice", categorySlug: "fruit-juice-concentrates", images: ["/images/products/passion-fruits-juice/passion-fruits-juice-1.png", "/images/products/passion-fruits-juice/passion-fruits-juice-2.png", "/images/products/passion-fruits-juice/passion-fruits-juice-3.png", "/images/products/passion-fruits-juice/passion-fruits-juice-4.png"] },
    { slug: "mango-concentrates", name: "Mango Concentrates", categorySlug: "fruit-juice-concentrates", images: ["/images/products/mango-concentrates/mango-concentrates-1.png", "/images/products/mango-concentrates/mango-concentrates-2.png", "/images/products/mango-concentrates/mango-concentrates-3.png", "/images/products/mango-concentrates/mango-concentrates-4.png"] },
    { slug: "pineapple-concentrates", name: "Pineapple Concentrates", categorySlug: "fruit-juice-concentrates", images: ["/images/products/pineapple-concentrates/pineapple-concentrates-1.png", "/images/products/pineapple-concentrates/pineapple-concentrates-2.png", "/images/products/pineapple-concentrates/pineapple-concentrates-3.png", "/images/products/pineapple-concentrates/pineapple-concentrates-4.png"] },
    { slug: "passion-fruits-concentrates", name: "Passion Fruits Concentrates", categorySlug: "fruit-juice-concentrates", images: ["/images/products/passion-fruits-concentrates/passion-fruits-concentrates-1.png", "/images/products/passion-fruits-concentrates/passion-fruits-concentrates-2.png", "/images/products/passion-fruits-concentrates/passion-fruits-concentrates-3.png", "/images/products/passion-fruits-concentrates/passion-fruits-concentrates-4.png"] },
    { slug: "fresh-coconut", name: "Fresh Coconut", categorySlug: "fresh-fruits", images: ["/images/products/fresh-coconut/fresh-coconut-1.png", "/images/products/fresh-coconut/fresh-coconut-2.png", "/images/products/fresh-coconut/fresh-coconut-3.png", "/images/products/fresh-coconut/fresh-coconut-4.png"] },
    { slug: "fresh-mango", name: "Fresh Mango", categorySlug: "fresh-fruits", images: ["/images/products/fresh-mango/fresh-mango-1.png", "/images/products/fresh-mango/fresh-mango-2.png", "/images/products/fresh-mango/fresh-mango-3.png", "/images/products/fresh-mango/fresh-mango-4.png"] },
    { slug: "sweet-potatoes", name: "Sweet Potatoes", categorySlug: "fresh-fruits", images: ["/images/products/sweet-potatoes/sweet-potatoes-1.png", "/images/products/sweet-potatoes/sweet-potatoes-2.png", "/images/products/sweet-potatoes/sweet-potatoes-3.png", "/images/products/sweet-potatoes/sweet-potatoes-4.png"] },
    { slug: "fresh-lime-seedless", name: "Fresh Lime Seedless", categorySlug: "fresh-fruits", images: ["/images/products/fresh-lime-seedless/fresh-lime-seedless-1.png", "/images/products/fresh-lime-seedless/fresh-lime-seedless-2.png", "/images/products/fresh-lime-seedless/fresh-lime-seedless-3.png", "/images/products/fresh-lime-seedless/fresh-lime-seedless-4.png"] },
    { slug: "fresh-pineapple-md2", name: "Fresh Pineapple MD2", categorySlug: "fresh-fruits", images: ["/images/products/fresh-pineapple-md2/fresh-pineapple-md2-1.png", "/images/products/fresh-pineapple-md2/fresh-pineapple-md2-2.png", "/images/products/fresh-pineapple-md2/fresh-pineapple-md2-3.png", "/images/products/fresh-pineapple-md2/fresh-pineapple-md2-4.png"] },
    { slug: "pomelo", name: "Pomelo", categorySlug: "fresh-fruits", images: ["/images/products/pomelo/pomelo-1.png", "/images/products/pomelo/pomelo-2.png", "/images/products/pomelo/pomelo-3.png", "/images/products/pomelo/pomelo-4.png"] },
    { slug: "muskmelon", name: "Muskmelon", categorySlug: "fresh-fruits", images: ["/images/products/muskmelon/muskmelon-1.png", "/images/products/muskmelon/muskmelon-2.png", "/images/products/muskmelon/muskmelon-3.png", "/images/products/muskmelon/muskmelon-4.png"] },
    { slug: "fresh-carrots", name: "Fresh Carrots", categorySlug: "fresh-fruits", images: ["/images/products/fresh-carrots/fresh-carrots-1.png", "/images/products/fresh-carrots/fresh-carrots-2.png", "/images/products/fresh-carrots/fresh-carrots-3.png", "/images/products/fresh-carrots/fresh-carrots-4.png"] },
    { slug: "canned-tuna", name: "Canned Tuna", categorySlug: "canned-fish", images: ["/images/products/canned-tuna/canned-tuna-1.png", "/images/products/canned-tuna/canned-tuna-2.png", "/images/products/canned-tuna/canned-tuna-3.png", "/images/products/canned-tuna/canned-tuna-4.png"] },
    { slug: "canned-sardine-tomato", name: "Canned Sardine With Tomato Sauces", categorySlug: "canned-fish", images: ["/images/products/canned-sardine-tomato/canned-sardine-tomato-1.png", "/images/products/canned-sardine-tomato/canned-sardine-tomato-2.png", "/images/products/canned-sardine-tomato/canned-sardine-tomato-3.png", "/images/products/canned-sardine-tomato/canned-sardine-tomato-4.png"] },
    { slug: "canned-sardine-black-bean", name: "Canned Sardine With Black Bean Sauces", categorySlug: "canned-fish", images: ["/images/products/canned-sardine-black-bean/canned-sardine-black-bean-1.png", "/images/products/canned-sardine-black-bean/canned-sardine-black-bean-2.png", "/images/products/canned-sardine-black-bean/canned-sardine-black-bean-3.png", "/images/products/canned-sardine-black-bean/canned-sardine-black-bean-4.png"] },
];
async function main() {
    const admin = await db_1.prisma.user.findFirst({ where: { role: client_1.Role.ADMIN } });
    if (!admin) {
        console.log("No admin found. Seed admin first.");
        return;
    }
    // Seed categories
    console.log("Seeding categories...");
    for (const cat of categories) {
        await db_1.prisma.category.upsert({
            where: { slug: cat.id },
            update: { name: cat.name },
            create: { slug: cat.id, name: cat.name }
        });
    }
    // Fetch created categories to get their IDs
    const dbCats = await db_1.prisma.category.findMany();
    const catMap = new Map(dbCats.map(c => [c.slug, c.id]));
    // Seed products
    console.log("Seeding products...");
    for (const prod of products) {
        const categoryId = catMap.get(prod.categorySlug);
        // Add default values as per frontend
        const origin = "Vietnam";
        const certifications = "ISO, HACCP, HALAL, BRC";
        const quality = "Export Standard";
        const packaging = "As requested / OEM";
        const shelfLife = "12 - 36 months";
        const shortDescription = "Premium quality " + prod.name.toLowerCase() + " sourced directly from trusted facilities in Vietnam.";
        const content = "Our " + prod.name.toLowerCase() + " is processed and packaged under strict international quality standards (ISO, HACCP, HALAL, BRC) to ensure the highest level of safety, freshness, and flavor for our global partners.";
        const createdProd = await db_1.prisma.product.upsert({
            where: { slug: prod.slug },
            update: {
                name: prod.name,
                categoryId,
                origin, certifications, quality, packaging, shelfLife, shortDescription, content
            },
            create: {
                name: prod.name,
                slug: prod.slug,
                status: "PUBLISHED",
                authorId: admin.id,
                categoryId,
                origin, certifications, quality, packaging, shelfLife, shortDescription, content,
            }
        });
        // Check existing images
        const existingImages = await db_1.prisma.productImage.count({ where: { productId: createdProd.id } });
        if (existingImages === 0 && prod.images.length > 0) {
            await db_1.prisma.productImage.createMany({
                data: prod.images.map((img, i) => ({
                    productId: createdProd.id,
                    imageUrl: img,
                    isFeatured: i === 0
                }))
            });
        }
    }
    console.log("Data seeding completed!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await db_1.prisma.$disconnect();
});
//# sourceMappingURL=seedData.js.map