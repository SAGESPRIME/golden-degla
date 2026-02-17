import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export function ProductList() {
  const products = useQuery(api.products.list, {});
  const addToCart = useMutation(api.cart.add);

  const handleAddToCart = async (productId: string, name: string) => {
    try {
      await addToCart({ productId: productId as any, quantity: 1 });
      toast.success(`${name} ajouté au panier`);
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier");
    }
  };

  if (!products) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100 rounded-t-lg flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="text-6xl">🍯</div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <span className="text-lg font-bold text-amber-600">
                {product.price.toFixed(2)}€
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
              
              <button
                onClick={() => handleAddToCart(product._id, product.name)}
                disabled={product.stock === 0}
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
