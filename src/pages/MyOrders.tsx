import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  paid: "Payée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  pending: Clock,
  paid: CheckCircle,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const STATUS_STEPS: OrderStatus[] = ["pending", "paid", "shipped", "delivered"];

export function MyOrders() {
  const orders = useQuery(api.orders.list);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!orders) {
    return (
      <div className="page-container py-20">
        <div className="space-y-4 max-w-2xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6">
              <div className="skeleton h-4 rounded-full w-1/3 mb-3" />
              <div className="skeleton h-3 rounded-full w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--primary-light)" }}
        >
          <Package className="w-10 h-10" style={{ color: "var(--primary)" }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Aucune commande
        </h2>
        <p className="mb-8 max-w-sm" style={{ color: "var(--text-secondary)" }}>
          Vous n'avez pas encore passé de commande. Découvrez nos miels d'exception !
        </p>
        <Link to="/products" className="btn-primary">
          <ShoppingBag className="w-5 h-5" />
          Découvrir nos miels
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding" style={{ backgroundColor: "var(--bg)" }}>
      <div className="page-container max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <span className="section-label">Mon compte</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
            Mes <span className="text-gradient">commandes</span>
          </h1>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            {orders.length} commande{orders.length > 1 ? "s" : ""} passée{orders.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedId === order._id;
            const status = order.status as OrderStatus;
            const StatusIcon = STATUS_ICONS[status];
            const stepIndex = STATUS_STEPS.indexOf(status);

            return (
              <div key={order._id} className="card overflow-hidden p-0">
                {/* Order header */}
                <div
                  className="p-5 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : order._id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Status icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "var(--primary-light)" }}
                      >
                        <StatusIcon className="w-5 h-5" style={{ color: "var(--primary)" }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                          {order.items.length} article{order.items.length > 1 ? "s" : ""}
                          {" · "}
                          <span style={{ color: "var(--primary)" }}>
                            {order.total.toFixed(2)} €
                          </span>
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {new Date(order._creationTime).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full",
                          STATUS_COLORS[status]
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {STATUS_LABELS[status]}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        style={{ color: "var(--text-muted)" }}
                      />
                    </div>
                  </div>

                  {/* Progress bar (not cancelled) */}
                  {status !== "cancelled" && (
                    <div className="mt-5">
                      <div className="flex items-center">
                        {STATUS_STEPS.map((step, i) => {
                          const done = i <= stepIndex;
                          const active = i === stepIndex;
                          return (
                            <div key={step} className="flex items-center flex-1 last:flex-none">
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                                    done
                                      ? "text-white shadow-sm"
                                      : ""
                                  )}
                                  style={
                                    done
                                      ? { backgroundColor: active ? "var(--primary)" : "var(--accent)" }
                                      : { backgroundColor: "var(--border)" }
                                  }
                                >
                                  {done ? (
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <span
                                  className="text-[10px] font-medium whitespace-nowrap hidden sm:block"
                                  style={{ color: done ? "var(--text)" : "var(--text-muted)" }}
                                >
                                  {STATUS_LABELS[step]}
                                </span>
                              </div>
                              {i < STATUS_STEPS.length - 1 && (
                                <div
                                  className="flex-1 h-0.5 mx-1 transition-all duration-300"
                                  style={{
                                    backgroundColor: i < stepIndex ? "var(--accent)" : "var(--border)",
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
                    {/* Articles */}
                    <div className="p-5">
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Articles commandés
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item: { _id: string; productName: string; price: number; quantity: number }) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                            style={{ backgroundColor: "var(--surface)" }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "var(--primary-light)" }}
                              >
                                <span className="text-lg">🍯</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                                  {item.productName}
                                </p>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                  {item.price.toFixed(2)} € / unité
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                                {(item.price * item.quantity).toFixed(2)} €
                              </p>
                              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                × {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div
                        className="flex justify-between items-center mt-3 pt-3"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          Total
                        </span>
                        <span className="font-bold text-lg" style={{ color: "var(--primary)" }}>
                          {order.total.toFixed(2)} €
                        </span>
                      </div>
                    </div>

                    {/* Shipping address */}
                    <div
                      className="px-5 pb-5"
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Adresse de livraison
                      </p>
                      <div
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ backgroundColor: "var(--surface)" }}
                      >
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          <p className="font-medium" style={{ color: "var(--text)" }}>
                            {order.shippingAddress.name}
                          </p>
                          <p>{order.shippingAddress.line1}</p>
                          {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                          <p>
                            {order.shippingAddress.postalCode} {order.shippingAddress.city}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
