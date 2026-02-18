import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import { SignInForm } from "../SignInForm";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Settings, Menu, X, User, Package } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  onCartClick: () => void;
  isAdmin: boolean;
}

export function Header({ onCartClick, isAdmin }: HeaderProps) {
  const { isAuthenticated } = useConvexAuth();
  const cartItems = useQuery(api.cart.get, !isAuthenticated ? "skip" : {}) || [];
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // React best practice: passive listener avoids blocking scroll thread
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/products", label: "Nos Miels" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-warm-sm"
          : "bg-[var(--bg)]"
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            <span className="text-2xl">🍯</span>
            <span>
              Golden <span style={{ color: "var(--primary)" }}>Dhlia</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--primary-light)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/mes-commandes"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive("/mes-commandes")
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--primary-light)]"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Mes commandes
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive("/admin")
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--primary-light)]"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-full transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--primary-light)]"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth - Desktop */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <SignOutButton />
              ) : (
                <button
                  onClick={() => setShowSignIn(true)}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  <User className="w-4 h-4" />
                  Connexion
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--primary-light)] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] py-4 space-y-1 animate-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && !isAdmin && (
              <Link
                to="/mes-commandes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/mes-commandes")
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
                }`}
              >
                <Package className="w-4 h-4" />
                Mes commandes
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive("/admin")
                    ? "bg-[var(--primary-light)] text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
                }`}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
            <div className="pt-3 border-t border-[var(--border)]">
              {isAuthenticated ? (
                <SignOutButton />
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowSignIn(true);
                  }}
                  className="btn-primary w-full text-sm"
                >
                  Connexion
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sign-in Modal */}
      {showSignIn && !isAuthenticated && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] rounded-2xl max-w-md w-full p-8 relative shadow-warm-xl">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--primary-light)] transition-colors text-[var(--text-muted)]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <span className="text-3xl mb-2 block">🍯</span>
              <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                Bienvenue
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Connectez-vous pour continuer
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      )}
    </header>
  );
}
