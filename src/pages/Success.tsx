import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag, Home, Sparkles } from "lucide-react";

export function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="max-w-md w-full rounded-2xl p-10 text-center shadow-warm-lg"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Decorative dots */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
                opacity: 0.6 + i * 0.1,
              }}
            />
          ))}
        </div>

        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--accent-light)" }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: "var(--accent)" }} />
        </div>

        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--text)" }}
        >
          Commande confirmee !
        </h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
        </p>

        {sessionId && (
          <div
            className="rounded-xl p-3 mb-6"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Reference: {sessionId.slice(0, 20)}...
            </p>
          </div>
        )}

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "var(--primary-light)" }}
        >
          <Package className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--primary)" }} />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Votre commande sera preparee et expediee dans les 2-3 jours ouvres.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/products" className="btn-primary justify-center w-full">
            <ShoppingBag className="w-5 h-5" />
            Continuer mes achats
          </Link>
          <Link
            to="/"
            className="btn-ghost justify-center w-full"
            style={{ border: "1px solid var(--border)", borderRadius: "9999px" }}
          >
            <Home className="w-5 h-5" />
            Retour a l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
