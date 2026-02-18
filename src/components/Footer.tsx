import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#1C0F06",
        color: "#C8B8AF",
      }}
    >
      {/* Main footer content */}
      <div className="page-container pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-5">
              <span className="text-2xl select-none">🍯</span>
              <span style={{ color: "#FFFFFF" }}>
                Golden{" "}
                <span style={{ color: "var(--primary)" }}>Dhlia</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#9C8E84" }}>
              Des miels biologiques d'exception, récoltés avec passion par nos
              apiculteurs partenaires en France depuis plus de 20 ans.
            </p>
            {/* Trust badge */}
            <div
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: "rgba(184, 134, 11, 0.15)",
                border: "1px solid rgba(184, 134, 11, 0.25)",
                color: "#D4A017",
              }}
            >
              🌿 Certifié Agriculture Biologique
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#FFFFFF", letterSpacing: "0.12em" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/products", label: "Nos Miels" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-all duration-200 hover:text-[var(--primary)] flex items-center gap-1.5 group"
                    style={{ color: "#9C8E84" }}
                  >
                    <ArrowRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#FFFFFF", letterSpacing: "0.12em" }}
            >
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <span className="text-sm" style={{ color: "#9C8E84" }}>
                  France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <span className="text-sm" style={{ color: "#9C8E84" }}>
                  01 23 45 67 89
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <span className="text-sm" style={{ color: "#9C8E84" }}>
                  contact@mielbio.fr
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <span className="text-sm" style={{ color: "#9C8E84" }}>
                  Lun – Ven : 9h – 18h
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#FFFFFF", letterSpacing: "0.12em" }}
            >
              Newsletter
            </h3>
            <p className="text-sm mb-5" style={{ color: "#9C8E84" }}>
              Recevez nos actualités et offres exclusives.
            </p>
            <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(184,134,11,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(184,134,11,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                className="btn-primary w-full text-sm justify-center"
              >
                S'abonner
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="page-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#6B5B4F" }}>
            © {currentYear} Golden Dhlia. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs transition-colors hover:text-[var(--primary)]"
              style={{ color: "#6B5B4F" }}
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="text-xs transition-colors hover:text-[var(--primary)]"
              style={{ color: "#6B5B4F" }}
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
