import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message envoye avec succes !");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: "France",
    },
    {
      icon: Phone,
      title: "Telephone",
      details: "01 23 45 67 89",
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@mielbio.fr",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "Lun - Ven: 9h - 18h",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--primary-light)" }}
      >
        <div className="page-container text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            Contactez-nous
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Une question sur nos miels ? Besoin d'un conseil ? Notre equipe est
            a votre ecoute.
          </p>
        </div>
      </section>

      <div className="page-container py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "var(--accent-light)" }}
                >
                  <CheckCircle
                    className="w-10 h-10"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  Message envoye !
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Nous vous repondrons dans les plus brefs delais.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-ghost mt-6"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 md:p-8 space-y-5"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Votre nom"
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
                      onChange={handleChange}
                      className="input-field"
                      placeholder="votre@email.fr"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    Sujet *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="question">Question sur un produit</option>
                    <option value="order">Suivi de commande</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-light)" }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.details}
                  </p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="aspect-[4/3] rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: "var(--primary-light)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-center">
                <MapPin
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: "var(--primary)" }}
                />
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Carte interactive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
