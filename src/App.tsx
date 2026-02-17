import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { Checkout } from "./pages/Checkout";
import { Success } from "./pages/Success";
import { Contact } from "./pages/Contact";
import { useState } from "react";

function RequireAuth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🍯</span>
            <h1
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text)" }}
            >
              Golden Degla
            </h1>
            <p
              className="text-base mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Connectez-vous pour continuer
            </p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>
    </>
  );
}

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const loggedInUser = useQuery(api.auth.loggedInUser);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <Header
        onCartClick={() => setShowCart(true)}
        isAdmin={loggedInUser?.email?.includes("admin") || false}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <CartPage />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout/success"
            element={
              <RequireAuth>
                <Success />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {showCart && <Cart onClose={() => setShowCart(false)} />}
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          },
        }}
      />
    </div>
  );
}

function AdminDashboard() {
  const orders = useQuery(api.orders.adminList);
  const products = useQuery(api.products.list, {});

  if (!orders || !products) {
    return (
      <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
        Chargement...
      </div>
    );
  }

  return (
    <div className="page-container py-12 space-y-8">
      <h2 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
        Dashboard Admin
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Commandes Recentes
          </h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="border-b pb-4"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium" style={{ color: "var(--text)" }}>
                      {order.customer?.email}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {order.items.length} article(s) - {order.total.toFixed(2)}€
                    </p>
                  </div>
                  <span
                    className={`badge ${
                      order.status === "paid"
                        ? "badge-accent"
                        : order.status === "pending"
                          ? "badge-primary"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Produits
          </h3>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium" style={{ color: "var(--text)" }}>
                    {product.name}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Stock: {product.stock}
                  </p>
                </div>
                <p className="font-semibold" style={{ color: "var(--primary)" }}>
                  {product.price.toFixed(2)}€
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
