import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Leaf,
  Heart,
  MapPin,
  Shield,
  Check,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { Id } from "../../convex/_generated/dataModel";

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useQuery(api.products.getBySlug, slug ? { slug } : "skip");
  const addToCart = useMutation(api.cart.add);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product === undefined) {
    return (
      <div className="page-container py-12">
        <div className="animate-pulse">
          <div className="skeleton h-5 rounded-full w-40 mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="skeleton aspect-square rounded-3xl" />
            <div className="space-y-4 pt-4">
              <div className="skeleton h-6 rounded-full w-24" />
              <div className="skeleton h-9 rounded-full w-3/4" />
              <div className="skeleton h-8 rounded-full w-1/4" />
              <div className="skeleton h-24 rounded-2xl" />
              <div className="skeleton h-14 rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="page-container py-24 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--primary-light)" }}
        >
          <span className="text-4xl select-none">🔍</span>
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Produit introuvable
        </h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          Ce produit n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/products" className="btn-primary">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product._id as Id<"products">, quantity });
      toast.success(`${product.name} ajouté au panier`);
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } catch {
      toast.error("Connectez-vous pour ajouter au panier");
    }
  };

  const maxQty = Math.min(product.stock, 10);
  const inStock = product.stock > 0;

  const benefits = [
    { icon: Leaf, label: "100% Bio", desc: "Certifié AB" },
    { icon: Heart, label: "Artisanal", desc: "Récolté à la main" },
    { icon: MapPin, label: "Français", desc: "Origine France" },
    { icon: Shield, label: "Qualité", desc: "Contrôle strict" },
  ];

  return (
    <div>
      <div className="page-container py-8 md:py-12">
        {/* ─── Breadcrumb ─── */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 mb-10 group"
          style={{ color: "var(--text-secondary)" }}
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-[var(--primary-light)]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:text-[var(--primary)] transition-colors" />
          </span>
          <span className="group-hover:text-[var(--text)] transition-colors">
            Retour au catalogue
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ─── Image ─── */}
          <div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-light) 0%, #FFF0A8 50%, rgba(232,245,233,0.3) 100%)",
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <span className="text-[140px] select-none animate-float">🍯</span>
              )}

              {/* Bio badge overlay */}
              {product.isOrganic && (
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent shadow-warm-sm">
                    🌿 Certifié Bio
                  </span>
                </div>
              )}
            </div>

            {/* Delivery info below image */}
            <div
              className="mt-4 rounded-2xl p-4 flex items-center gap-3"
              style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--primary-light)" }}
              >
                <Truck className="w-4 h-4" style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  Livraison gratuite dès 40€
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Expédition en 24–48h ouvrées
                </p>
              </div>
            </div>
          </div>

          {/* ─── Details ─── */}
          <div className="flex flex-col">
            {/* Category */}
            {product.category && (
              <span className="badge badge-primary mb-4 self-start">
                {product.category.name}
              </span>
            )}

            {/* Name */}
            <h1
              className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-4xl font-bold text-gradient">
                {product.price.toFixed(2)}€
              </p>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                / pot 250g
              </span>
            </div>

            {/* Divider */}
            <div className="mb-6" style={{ borderTop: "1px solid var(--border)" }} />

            {/* Description */}
            <p
              className="leading-relaxed mb-6 text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {product.description}
            </p>

            {/* Stock status */}
            <div className="mb-6">
              {inStock ? (
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                    En stock · {product.stock} disponibles
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm font-medium text-red-500">Rupture de stock</span>
                </div>
              )}
            </div>

            {/* ─── Quantity + Add to Cart ─── */}
            {inStock && (
              <div className="flex items-stretch gap-4 mb-8">
                {/* Quantity selector */}
                <div
                  className="flex items-center rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3.5 transition-all duration-200 hover:bg-[var(--primary-light)] disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" style={{ color: "var(--text)" }} />
                  </button>
                  <span
                    className="w-12 text-center font-bold text-base"
                    style={{ color: "var(--text)" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                    className="px-4 py-3.5 transition-all duration-200 hover:bg-[var(--primary-light)] disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={quantity >= maxQty}
                  >
                    <Plus className="w-4 h-4" style={{ color: "var(--text)" }} />
                  </button>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-4 text-base"
                  style={
                    added
                      ? {
                          backgroundColor: "var(--accent)",
                          boxShadow: "0 8px 24px rgba(74,124,89,0.3)",
                        }
                      : {}
                  }
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      Ajouté !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ─── Benefits grid ─── */}
            <div
              className="grid grid-cols-2 gap-3 pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {benefits.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-3 p-3.5 rounded-2xl transition-colors duration-200 hover:bg-[var(--primary-light)]"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--primary-light)" }}
                  >
                    <b.icon className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {b.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
