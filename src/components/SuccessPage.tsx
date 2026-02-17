import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CheckCircle, Package } from "lucide-react";
import { useEffect, useState } from "react";

export function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSessionId(urlParams.get("session_id"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-600">
            Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Votre commande sera préparée et expédiée dans les 2-3 jours ouvrés.
          </p>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          Continuer mes achats
        </button>
      </div>
    </div>
  );
}
