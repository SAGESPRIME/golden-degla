import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { Id } from "../../convex/_generated/dataModel";

export function CartPage() {
  const cartItems = useQuery(api.cart.get) || [];
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeItem = useMutation(api.cart.remove);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity({ itemId: itemId as Id<"cart">, quantity: newQuantity });
    } catch {
      toast.error("Erreur lors de la mise a jour");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem({ itemId: itemId as Id<"cart"> });
      toast.success("Article retire du panier");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="page-container py-8 md:py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Continuer mes achats
      </Link>

      <h1
        className="text-3xl md:text-4xl font-bold mb-10"
        style={{ color: "var(--text)" }}
      >
        Mon Panier
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "var(--primary-light)" }}
          >
            <ShoppingBag
              className="w-10 h-10"
              style={{ color: "var(--text-muted)" }}
            />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--text)" }}
          >
            Votre panier est vide
          </h2>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            Ajoutez des miels pour commencer !
          </p>
          <Link to="/products" className="btn-primary">
            Decouvrir nos miels
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: "var(--primary-light)" }}
                >
                  {item.product?.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-3xl">🍯</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {item.product?.name}
                  </h3>
                  <p
                    className="font-bold"
                    style={{ color: "var(--primary)" }}
                  >
                    {item.product?.price?.toFixed(2)}€
                  </p>
                </div>

                <div
                  className="flex items-center rounded-full"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                    className="p-2.5 hover:bg-[var(--primary-light)] transition-colors rounded-l-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    className="w-10 text-center font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                    className="p-2.5 hover:bg-[var(--primary-light)] transition-colors rounded-r-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p
                  className="font-bold w-24 text-right"
                  style={{ color: "var(--text)" }}
                >
                  {((item.product?.price || 0) * item.quantity).toFixed(2)}€
                </p>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div
            className="rounded-2xl p-6 h-fit lg:sticky lg:top-24"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-lg font-bold mb-5"
              style={{ color: "var(--text)" }}
            >
              Recapitulatif
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>
                  Sous-total
                </span>
                <span style={{ color: "var(--text)" }}>
                  {total.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>
                  Livraison
                </span>
                <span style={{ color: "var(--accent)" }} className="font-medium">
                  Gratuite
                </span>
              </div>
            </div>

            <div
              className="border-t pt-4 mb-6"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex justify-between text-xl font-bold">
                <span style={{ color: "var(--text)" }}>Total</span>
                <span style={{ color: "var(--text)" }}>
                  {total.toFixed(2)}€
                </span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full justify-center">
              Proceder au paiement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
