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
import { AdminDashboard } from "./pages/AdminDashboard";
import { MyOrders } from "./pages/MyOrders";
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
              Golden Dhlia
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

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  return (
    <>
      <Authenticated>
        {loggedInUser === undefined ? null : loggedInUser?.email?.includes("admin") ? (
          <>{children}</>
        ) : (
          <Navigate to="/" replace />
        )}
      </Authenticated>
      <Unauthenticated>
        <Navigate to="/" replace />
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
            path="/mes-commandes"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
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

