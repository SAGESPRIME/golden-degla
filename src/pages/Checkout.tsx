import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CheckoutForm } from "../components/CheckoutForm";

export function Checkout() {
  const navigate = useNavigate();
  const cartItems = useQuery(api.cart.get) || [];

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--primary-light)" }}
        >
          <ShoppingBag className="w-8 h-8" style={{ color: "var(--text-muted)" }} />
        </div>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Votre panier est vide
        </h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          Ajoutez des produits avant de passer commande.
        </p>
        <Link to="/products" className="btn-primary">
          Decouvrir nos miels
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container py-8 md:py-12">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au panier
      </Link>

      <h1
        className="text-3xl md:text-4xl font-bold mb-10"
        style={{ color: "var(--text)" }}
      >
        Paiement
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div
          className="lg:col-span-2 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <CheckoutForm
            total={total}
            onClose={() => navigate(-1)}
            onBack={() => navigate(-1)}
          />
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
            Votre commande
          </h2>

          <div className="space-y-4 mb-5">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: "var(--primary-light)" }}
                >
                  {item.product?.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product?.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-lg">🍯</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {item.product?.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Qte: {item.quantity}
                  </p>
                </div>
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {((item.product?.price || 0) * item.quantity).toFixed(2)}€
                </p>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-4 space-y-2"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-secondary)" }}>Sous-total</span>
              <span style={{ color: "var(--text)" }}>{total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-secondary)" }}>Livraison</span>
              <span style={{ color: "var(--accent)" }} className="font-medium">
                Gratuite
              </span>
            </div>
            <div
              className="flex justify-between text-lg font-bold pt-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <span style={{ color: "var(--text)" }}>Total</span>
              <span style={{ color: "var(--text)" }}>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
