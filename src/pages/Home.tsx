import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import {
  Leaf,
  Heart,
  MapPin,
  Star,
  ArrowRight,
  Shield,
  Truck,
} from "lucide-react";

export function Home() {
  const products = useQuery(api.products.list, { limit: 4 });

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden hero-gradient">
        {/* Decorative background shapes */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(184,134,11,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-[360px] h-[360px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(74,124,89,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(184,134,11,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="page-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
            {/* Text */}
            <div>
              <span className="badge badge-gold animate-fade-in-up">
                <Leaf className="w-3 h-3" />
                100% Biologique · Certifié AB
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 mt-6 animate-fade-in-up-1">
                Du rucher
                <br />
                à votre{" "}
                <span className="text-gradient">table</span>
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg animate-fade-in-up-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Savourez l'authenticité de nos miels biologiques français,
                récoltés avec passion par nos apiculteurs partenaires depuis plus
                de 20 ans.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up-3">
                <Link to="/products" className="btn-primary text-base px-8 py-4">
                  Découvrir nos miels
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-secondary text-base px-8 py-4">
                  Nous contacter
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-6 mt-10 animate-fade-in-up-4">
                <div className="flex -space-x-2">
                  {["#B8860B", "#4A7C59", "#96700A"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {["M", "P", "S"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-current"
                        style={{ color: "var(--primary)" }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="font-semibold" style={{ color: "var(--text)" }}>
                      4.9/5
                    </span>{" "}
                    · 500+ clients satisfaits
                  </p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Main circle */}
              <div
                className="w-[420px] h-[420px] rounded-full flex items-center justify-center animate-float"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #FFF9E8 0%, #FFECC0 60%, #FFE085 100%)",
                  boxShadow:
                    "0 30px 60px -15px rgba(184, 134, 11, 0.25), inset 0 -10px 30px rgba(184,134,11,0.05)",
                }}
              >
                <span className="text-[148px] leading-none select-none">🍯</span>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute top-6 right-4 card !p-4 !rounded-2xl shadow-warm-lg animate-float-delay">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent-light)" }}
                  >
                    <Leaf className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
                      Certifié AB
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Agriculture Biologique
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute bottom-10 left-2 card !p-4 !rounded-2xl shadow-warm-lg animate-float">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary-light)" }}
                  >
                    <Star className="w-5 h-5 fill-current" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--text)" }}>
                      4.9 / 5
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      500+ avis vérifiés
                    </p>
                  </div>
                </div>
              </div>

              {/* Small decorative badge — top left */}
              <div
                className="absolute top-24 -left-2 rounded-xl px-3 py-2 shadow-warm text-xs font-semibold animate-float-delay"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--accent)",
                }}
              >
                🇫🇷 Origine France
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Value Props ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Biologique",
                desc: "Certifié AB, nos miels sont produits sans pesticides ni traitements chimiques.",
                color: "var(--accent)",
                bg: "var(--accent-light)",
                delay: "",
              },
              {
                icon: Heart,
                title: "Artisanal",
                desc: "Récolté à la main avec des méthodes traditionnelles respectueuses des abeilles.",
                color: "var(--primary)",
                bg: "var(--primary-light)",
                delay: "0.1s",
              },
              {
                icon: MapPin,
                title: "Origine France",
                desc: "Produit et mis en pot en France, pour soutenir nos apiculteurs locaux.",
                color: "var(--accent)",
                bg: "var(--accent-light)",
                delay: "0.2s",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card card-lift text-center p-8"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg)" }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <span className="section-label">
              <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
              Collection
              <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Nos Miels d'<span className="text-gradient">Exception</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Une sélection de miels d'exception, du rucher à votre table.
            </p>
          </div>

          {!products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                  <div className="skeleton aspect-square" />
                  <div className="p-5 space-y-2.5">
                    <div className="skeleton h-4 rounded-full w-3/4" />
                    <div className="skeleton h-3 rounded-full w-1/2" />
                    <div className="skeleton h-3 rounded-full w-2/3" />
                    <div className="skeleton h-8 rounded-full mt-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className="product-card group"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Image */}
                  <div
                    className="aspect-square flex items-center justify-center overflow-hidden relative"
                    style={{ backgroundColor: "var(--primary-light)" }}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        style={{ transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                      />
                    ) : (
                      <span
                        className="text-6xl select-none transition-transform duration-500"
                        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                      >
                        🍯
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                      style={{
                        background: "linear-gradient(to top, rgba(184,134,11,0.12) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="font-semibold mb-1 group-hover:text-[var(--primary)] transition-colors duration-200"
                      style={{ color: "var(--text)" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p
                        className="text-lg font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {product.price.toFixed(2)}€
                      </p>
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        250g
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-secondary">
              Voir tous nos miels
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Notre Histoire ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative">
              <div
                className="aspect-[4/3] rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-light) 0%, #FFF0A8 50%, var(--accent-light) 100%)",
                }}
              >
                <span className="text-8xl select-none animate-float">🐝</span>
              </div>
              {/* Decorative stat card */}
              <div
                className="absolute -bottom-5 -right-5 card !rounded-2xl !p-5 shadow-warm-lg hidden md:block"
              >
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  20+
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  années d'expertise
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="section-label">Notre Histoire</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text)" }}>
                Une passion transmise{" "}
                <span className="text-gradient">de génération en génération</span>
              </h2>
              <p
                className="leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Depuis plus de 20 ans, nous travaillons main dans la main avec
                des apiculteurs passionnés pour vous offrir des miels d'une
                qualité exceptionnelle. Chaque pot raconte une histoire, celle
                d'un terroir, d'un savoir-faire et d'un engagement pour la
                nature.
              </p>
              <p
                className="leading-relaxed mb-10"
                style={{ color: "var(--text-secondary)" }}
              >
                Nos abeilles butinent dans des prairies préservées, loin de toute
                pollution, pour produire des miels aux arômes uniques et aux
                bienfaits préservés.
              </p>

              {/* Stats row */}
              <div className="flex gap-8 mb-10 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  { value: "20+", label: "ans d'expérience" },
                  { value: "500+", label: "clients fidèles" },
                  { value: "100%", label: "certifié bio" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg)" }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <span className="section-label">
              <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
              Témoignages
              <span className="w-8 h-px inline-block" style={{ backgroundColor: "var(--primary)" }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Marie L.",
                role: "Cliente depuis 2 ans",
                text: "Le miel de lavande est tout simplement exquis. On sent la différence avec les miels industriels. Je recommande vivement !",
                rating: 5,
                initial: "M",
              },
              {
                name: "Pierre D.",
                role: "Client fidèle",
                text: "Livraison rapide et produits de grande qualité. Les pots sont magnifiques et le miel est délicieux. Client fidèle depuis 2 ans.",
                rating: 5,
                initial: "P",
              },
              {
                name: "Sophie M.",
                role: "Cliente régulière",
                text: "J'offre ces miels en cadeau et ils font toujours sensation. Le miel de forêt est mon préféré, avec ses notes boisées uniques.",
                rating: 5,
                initial: "S",
              },
            ].map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className="card !p-8 relative flex flex-col"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Opening quote mark */}
                <span className="quote-mark leading-none -mb-2 block">"</span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: "var(--primary)" }}
                    />
                  ))}
                </div>

                {/* Quote text in Fraunces */}
                <p
                  className="leading-relaxed mb-6 flex-1"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.9375rem",
                  }}
                >
                  {testimonial.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─── */}
      <section
        className="py-10"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="page-container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {[
              { icon: Truck, label: "Livraison gratuite dès 40€" },
              { icon: Shield, label: "Paiement 100% sécurisé" },
              { icon: Leaf, label: "Certifié Agriculture Bio" },
              { icon: Heart, label: "Fait avec amour" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-light)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "var(--primary)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, #96700A 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="page-container text-center relative">
          <span
            className="text-4xl mb-6 block select-none animate-float"
          >
            🍯
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Envie de goûter à l'excellence ?
          </h2>
          <p className="text-white/75 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Commandez dès maintenant et recevez votre miel en 2–3 jours ouvrés.
            Livraison gratuite dès 40€.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--primary)",
              }}
            >
              Commander maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-base transition-all duration-300 border-2 border-white/40 text-white hover:bg-white/10 hover:-translate-y-0.5"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
