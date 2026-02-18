import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user?.email?.includes("admin")) throw new Error("Admin access required");

    const existing = await ctx.db.query("categories").collect();
    if (existing.length > 0) return "Already seeded";

    // ── Catégories ──
    const acacia = await ctx.db.insert("categories", {
      name: "Acacia",
      slug: "acacia",
      description: "Miel doux et cristallin, idéal pour le quotidien",
    });

    const lavande = await ctx.db.insert("categories", {
      name: "Lavande",
      slug: "lavande",
      description: "Miel floral aux arômes de Provence",
    });

    const foret = await ctx.db.insert("categories", {
      name: "Forêt",
      slug: "foret",
      description: "Miel de miellat aux notes boisées et intenses",
    });

    const montagne = await ctx.db.insert("categories", {
      name: "Montagne",
      slug: "montagne",
      description: "Miel sauvage récolté en altitude",
    });

    // ── Produits Acacia ──
    await ctx.db.insert("products", {
      name: "Miel d'Acacia Bio 250g",
      slug: "miel-acacia-250g",
      description:
        "Notre miel d'acacia bio est récolté dans les forêts françaises. D'une douceur incomparable, il reste liquide longtemps et ne cristallise presque pas. Certifié Agriculture Biologique, il est idéal sur une tartine, dans un yaourt ou pour sucrer vos boissons.",
      price: 12.9,
      stock: 48,
      categoryId: acacia,
      isActive: true,
    });

    await ctx.db.insert("products", {
      name: "Miel d'Acacia Bio 500g",
      slug: "miel-acacia-500g",
      description:
        "Format familial de notre miel d'acacia bio. Sa saveur délicate et son aspect cristallin en font le préféré des petits et des grands. Récolté à la main par nos apiculteurs partenaires en Île-de-France.",
      price: 22.5,
      stock: 32,
      categoryId: acacia,
      isActive: true,
    });

    // ── Produits Lavande ──
    await ctx.db.insert("products", {
      name: "Miel de Lavande Bio 250g",
      slug: "miel-lavande-250g",
      description:
        "Récolté sur les plateaux de Haute-Provence en juillet, ce miel de lavande bio dégage des arômes floraux exceptionnels. Sa couleur dorée et son goût légèrement mentholé en font un produit d'exception. Idéal en infusion ou sur du fromage frais.",
      price: 14.5,
      stock: 35,
      categoryId: lavande,
      isActive: true,
    });

    await ctx.db.insert("products", {
      name: "Miel de Lavande Fine Bio 500g",
      slug: "miel-lavande-fine-500g",
      description:
        "Issu exclusivement de la lavande fine sauvage de Haute-Provence (altitude 800-1200m), ce miel d'exception cristallise en une crème fine et onctueuse. Son bouquet floral est d'une rare élégance. Parfait pour offrir.",
      price: 26.9,
      stock: 20,
      categoryId: lavande,
      isActive: true,
    });

    // ── Produits Forêt ──
    await ctx.db.insert("products", {
      name: "Miel de Forêt Bio 250g",
      slug: "miel-foret-250g",
      description:
        "Ce miel de miellat de forêt est récolté dans les bois du Massif Central. Sa couleur ambrée foncée et ses notes boisées, légèrement maltées, en font un miel de caractère. Riche en minéraux, idéal pour les sportifs et les amateurs de saveurs intenses.",
      price: 13.9,
      stock: 40,
      categoryId: foret,
      isActive: true,
    });

    await ctx.db.insert("products", {
      name: "Miel de Sapin Bio 250g",
      slug: "miel-sapin-250g",
      description:
        "Le miel de sapin est l'un des miels les plus rares et les plus recherchés. Récolté dans les Vosges sur les miellats de sapin, il dégage des arômes résineux et boisés uniques. Sa teneur exceptionnelle en minéraux en fait un véritable trésor nutritif.",
      price: 16.9,
      stock: 15,
      categoryId: foret,
      isActive: true,
    });

    // ── Produits Montagne ──
    await ctx.db.insert("products", {
      name: "Miel de Montagne Bio 250g",
      slug: "miel-montagne-250g",
      description:
        "Récolté à plus de 1000m d'altitude dans les Alpes françaises, ce miel toutes fleurs de montagne est d'une richesse aromatique incomparable. Ses notes florales variées (serpolet, génépi, myrtille) reflètent la biodiversité des prairies alpines.",
      price: 15.5,
      stock: 25,
      categoryId: montagne,
      isActive: true,
    });

    await ctx.db.insert("products", {
      name: "Miel de Châtaignier Bio 250g",
      slug: "miel-chataignier-250g",
      description:
        "Ce miel de châtaignier récolté en Ardèche est le miel des amateurs de saveurs fortes. Sa couleur brun foncé, son arôme puissant et légèrement amer, sa richesse en tanins en font un miel de gastronomie. Exceptionnel avec du fromage affiné ou du chocolat noir.",
      price: 14.9,
      stock: 30,
      categoryId: montagne,
      isActive: true,
    });

    return "Seeded: 4 catégories et 8 produits créés avec succès";
  },
});
