import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

interface CheckoutFormProps {
  total: number;
  onClose: () => void;
  onBack: () => void;
}

export function CheckoutForm({ total, onClose, onBack }: CheckoutFormProps) {
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    postalCode: "",
    country: "FR",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createCheckoutSession({
        shippingAddress: formData,
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch {
      toast.error("Erreur lors de la creation de la session de paiement");
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Livraison
        </h2>
        <div className="w-16" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Nom complet *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              placeholder="jean@exemple.fr"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text)" }}
          >
            Adresse *
          </label>
          <input
            type="text"
            name="line1"
            required
            value={formData.line1}
            onChange={handleInputChange}
            className="input-field"
            placeholder="123 Rue des Abeilles"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text)" }}
          >
            Complement d'adresse
          </label>
          <input
            type="text"
            name="line2"
            value={formData.line2}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Appartement, etage..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Ville *
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Paris"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Code postal *
            </label>
            <input
              type="text"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleInputChange}
              className="input-field"
              placeholder="75001"
            />
          </div>
        </div>

        <div
          className="border-t pt-6 mt-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex justify-between items-center mb-5">
            <span
              className="text-lg font-bold"
              style={{ color: "var(--text)" }}
            >
              Total a payer
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {total.toFixed(2)}€
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Payer avec Stripe
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Lock className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Paiement securise par Stripe
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
