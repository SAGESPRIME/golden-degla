import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import type { Id } from "../../convex/_generated/dataModel";

export function Products() {
  const categories = useQuery(api.categories.list);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // React best practice: useTransition for non-urgent category filter updates
  const [isPending, startTransition] = useTransition();

  const products = useQuery(
    api.products.list,
    selectedCategory
      ? { categoryId: selectedCategory as Id<"categories"> }
      : {}
  );
  const addToCart = useMutation(api.cart.add);

  const handleCategoryChange = (id: string | null) => {
    startTransition(() => {
      setSelectedCategory(id);
    });
  };

  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: string,
    name: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({ productId: productId as Id<"products">, quantity: 1 });
      toast.success(`${name} ajouté au panier`);
    } catch {
      toast.error("Connectez-vous pour ajouter au panier");
    }
  };

  return (
    <div>
      {/* ─── Page Header ─── */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-lighter) 0%, var(--primary-light) 50%, rgba(232,245,233,0.3) 100%)",
        }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(184,134,11,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="page-container text-center relative">
          <span className="section-label">
            <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
            Notre Sélection
            <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 mt-2"
            style={{ color: "var(--text)" }}
          >
            Nos <span className="text-gradient">Miels</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Découvrez notre sélection de miels biologiques français, récoltés
            avec passion par nos apiculteurs partenaires.
          </p>
        </div>
      </section>

      <div className="page-container py-12">
        {/* ─── Category Filters ─── */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <div
              className="flex items-center gap-1.5 text-xs font-medium mr-2"
              style={{ color: "var(--text-muted)" }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtrer :
            </div>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === null
                  ? "text-white shadow-warm"
                  : "hover:shadow-warm-sm"
              }`}
              style={
                selectedCategory === null
                  ? {
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                    }
                  : {
                      backgroundColor: "var(--surface)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category._id
                    ? "text-white shadow-warm"
                    : "hover:shadow-warm-sm"
                }`}
                style={
                  selectedCategory === category._id
                    ? {
                        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                      }
                    : {
                        backgroundColor: "var(--surface)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* ─── Product Grid ─── */}
        <div
          className={`transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}
        >
          {!products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="skeleton aspect-square" />
                  <div className="p-5 space-y-2.5">
                    <div className="skeleton h-5 rounded-full w-3/4" />
                    <div className="skeleton h-3.5 rounded-full w-1/2" />
                    <div className="skeleton h-3.5 rounded-full w-2/3" />
                    <div className="skeleton h-10 rounded-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "var(--primary-light)" }}
              >
                <span className="text-4xl select-none">🍯</span>
              </div>
              <p className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                Aucun produit dans cette catégorie
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Essayez une autre catégorie ou revenez bientôt.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className="product-card group"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div
                      className="aspect-square flex items-center justify-center"
                      style={{ backgroundColor: "var(--primary-light)" }}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700"
                          style={{
                            transform: "scale(1)",
                            transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                          }
                        />
                      ) : (
                        <span className="text-7xl select-none group-hover:scale-110 transition-transform duration-500"
                          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                          🍯
                        </span>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isOrganic && (
                        <span className="badge badge-accent shadow-sm">
                          🌿 Bio
                        </span>
                      )}
                    </div>

                    {/* Out of stock overlay */}
                    {product.stock === 0 && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,251,245,0.75)" }}
                      >
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: "#FEE2E2",
                            color: "#DC2626",
                          }}
                        >
                          Rupture de stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className="text-base font-semibold leading-snug group-hover:text-[var(--primary)] transition-colors duration-200"
                        style={{ color: "var(--text)" }}
                      >
                        {product.name}
                      </h3>
                      <span
                        className="text-lg font-bold ml-3 flex-shrink-0"
                        style={{ color: "var(--primary)" }}
                      >
                        {product.price.toFixed(2)}€
                      </span>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className="flex items-center gap-1 text-xs font-medium"
                        style={{
                          color:
                            product.stock > 0
                              ? "var(--accent)"
                              : "var(--text-muted)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{
                            backgroundColor:
                              product.stock > 0 ? "var(--accent)" : "var(--text-muted)",
                          }}
                        />
                        {product.stock > 0
                          ? `En stock`
                          : "Épuisé"}
                      </span>

                      <button
                        onClick={(e) =>
                          handleAddToCart(e, product._id, product.name)
                        }
                        disabled={product.stock === 0}
                        className="btn-primary !px-4 !py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
