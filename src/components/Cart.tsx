import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface CartProps {
  onClose: () => void;
}

export function Cart({ onClose }: CartProps) {
  const cartItems = useQuery(api.cart.get) || [];
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeItem = useMutation(api.cart.remove);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const freeShipping = total >= 40;

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity({ itemId: itemId as any, quantity: newQuantity });
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem({ itemId: itemId as any });
      toast.success("Article retiré du panier");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer — slides in from right */}
      <div
        className="absolute top-0 right-0 h-full w-full max-w-md flex flex-col"
        style={{
          backgroundColor: "var(--surface)",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
          animation: "slideInFromRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2 className="text-lg font-bold flex items-center gap-2.5" style={{ color: "var(--text)" }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--primary-light)" }}
            >
              <ShoppingBag className="w-4.5 h-4.5" style={{ color: "var(--primary)" }} />
            </div>
            Panier
            {cartItems.length > 0 && (
              <span
                className="ml-1 text-sm font-semibold rounded-full px-2.5 py-0.5"
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--primary-light)]"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {cartItems.length > 0 && (
          <div
            className="px-6 py-3"
            style={{ backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)" }}
          >
            {freeShipping ? (
              <p className="text-xs font-medium text-center" style={{ color: "var(--accent)" }}>
                🎉 Livraison gratuite offerte !
              </p>
            ) : (
              <div>
                <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                  Plus que{" "}
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    {(40 - total).toFixed(2)}€
                  </span>{" "}
                  pour la livraison gratuite
                </p>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((total / 40) * 100, 100)}%`,
                      background: "linear-gradient(90deg, var(--primary) 0%, #D4A017 100%)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "var(--primary-light)" }}
              >
                <ShoppingBag className="w-8 h-8" style={{ color: "var(--primary)" }} />
              </div>
              <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                Votre panier est vide
              </p>
              <p className="text-sm mb-7" style={{ color: "var(--text-muted)" }}>
                Découvrez nos miels d'exception
              </p>
              <Link to="/products" onClick={onClose} className="btn-primary text-sm">
                Voir nos miels
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-200"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Product image */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: "var(--primary-light)" }}
                  >
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-2xl select-none">🍯</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium text-sm leading-snug truncate mb-1"
                      style={{ color: "var(--text)" }}
                    >
                      {item.product?.name}
                    </h3>
                    <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                      {((item.product?.price || 0) * item.quantity).toFixed(2)}€
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-[var(--primary-light)] transition-colors"
                    >
                      <Minus className="w-3 h-3" style={{ color: "var(--text)" }} />
                    </button>
                    <span
                      className="w-7 text-center text-sm font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-[var(--primary-light)] transition-colors"
                    >
                      <Plus className="w-3 h-3" style={{ color: "var(--text)" }} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                    style={{ color: "#C0A0A0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#C0A0A0")}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            className="px-6 py-5 space-y-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Sous-total
              </span>
              <span className="text-xl font-bold" style={{ color: "var(--text)" }}>
                {total.toFixed(2)}€
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center text-xs" style={{ color: "var(--text-muted)" }}>
              <span>Livraison</span>
              <span className={freeShipping ? "" : ""} style={{ color: freeShipping ? "var(--accent)" : undefined }}>
                {freeShipping ? "Gratuite 🎉" : "À calculer"}
              </span>
            </div>

            <div
              className="pt-3 space-y-2.5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <Link
                to="/cart"
                onClick={onClose}
                className="btn-ghost w-full justify-center text-sm !rounded-xl"
                style={{ border: "1px solid var(--border)" }}
              >
                Voir le panier complet
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Passer la commande
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
