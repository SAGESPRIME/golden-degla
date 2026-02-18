import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronDown,
  AlertTriangle,
  Euro,
} from "lucide-react";
import { cn } from "../lib/utils";

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
type Tab = "overview" | "orders" | "products" | "clients";

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

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs = [
    { id: "overview" as Tab, label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "orders" as Tab, label: "Commandes", icon: ShoppingBag },
    { id: "products" as Tab, label: "Produits", icon: Package },
    { id: "clients" as Tab, label: "Clients", icon: Users },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="page-container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                Tableau de bord
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                Gérez vos commandes, produits et clients
              </p>
            </div>
            <span className="badge badge-gold text-xs">Admin</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "text-white shadow-sm"
                    : "hover:opacity-80"
                )}
                style={
                  activeTab === tab.id
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : { color: "var(--text-secondary)", backgroundColor: "transparent" }
                }
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-container py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "clients" && <ClientsTab />}
      </div>
    </div>
  );
}

/* ─── Overview Tab ─── */
function OverviewTab() {
  const orders = useQuery(api.orders.adminList);

  if (!orders) return <LoadingState />;

  const totalRevenue = orders
    .filter((o) => ["paid", "shipped", "delivered"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const paidCount = orders.filter((o) => o.status === "paid").length;
  const uniqueClients = new Set(orders.map((o) => o.userId)).size;

  const stats = [
    {
      label: "Chiffre d'affaires",
      value: `${totalRevenue.toFixed(2)} €`,
      icon: Euro,
      color: "var(--primary)",
      bg: "var(--primary-light)",
      sub: "commandes payées",
    },
    {
      label: "Total commandes",
      value: orders.length,
      icon: ShoppingBag,
      color: "#6366f1",
      bg: "#eef2ff",
      sub: `dont ${paidCount} payées`,
    },
    {
      label: "En attente",
      value: pendingCount,
      icon: Clock,
      color: "#d97706",
      bg: "#fef3c7",
      sub: "à traiter",
    },
    {
      label: "Clients",
      value: uniqueClients,
      icon: Users,
      color: "var(--accent)",
      bg: "var(--accent-light)",
      sub: "clients uniques",
    },
  ];

  const recentOrders = orders.slice(0, 8);

  const statusDistribution = (["pending", "paid", "shipped", "delivered", "cancelled"] as OrderStatus[]).map(
    (status) => ({
      status,
      count: orders.filter((o) => o.status === status).length,
    })
  );

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: "var(--text)" }}>
              {stat.value}
            </p>
            <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text)" }}>
              {stat.label}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
            Dernières commandes
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const StatusIcon = STATUS_ICONS[order.status as OrderStatus];
              return (
                <div
                  key={order._id}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {order.customer?.name?.[0] || order.shippingAddress.name[0] || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {order.items.length} article(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                      {order.total.toFixed(2)} €
                    </span>
                    <span className={cn("flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full", STATUS_COLORS[order.status as OrderStatus])}>
                      <StatusIcon className="w-3 h-3" />
                      {STATUS_LABELS[order.status as OrderStatus]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
            Répartition des statuts
          </h3>
          <div className="space-y-3">
            {statusDistribution.map(({ status, count }) => {
              const pct = orders.length > 0 ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--text-secondary)" }}>{STATUS_LABELS[status]}</span>
                    <span className="font-medium" style={{ color: "var(--text)" }}>
                      {count}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", STATUS_COLORS[status].split(" ")[0])}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Orders Tab ─── */
function OrdersTab() {
  const orders = useQuery(api.orders.adminList);
  const updateStatus = useMutation(api.orders.updateStatus);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!orders) return <LoadingState />;

  const filtered =
    filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);

  const handleStatusChange = async (orderId: Id<"orders">, status: OrderStatus) => {
    await updateStatus({ orderId, status });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "paid", "shipped", "delivered", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150",
              filterStatus === s ? "text-white shadow-sm" : ""
            )}
            style={
              filterStatus === s
                ? { backgroundColor: "var(--primary)", color: "white" }
                : {
                    backgroundColor: "var(--surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }
            }
          >
            {s === "all" ? `Toutes (${orders.length})` : `${STATUS_LABELS[s]} (${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Client</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Articles</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Total</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Statut</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Livraison</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const isExpanded = expandedOrder === order._id;
                return (
                  <React.Fragment key={order._id}>
                    <tr
                      style={{ borderBottom: "1px solid var(--border)" }}
                      className="hover:bg-[var(--bg)] transition-colors duration-100"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: "var(--primary)" }}
                          >
                            {order.shippingAddress.name[0]}
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: "var(--text)" }}>
                              {order.shippingAddress.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {order.shippingAddress.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span style={{ color: "var(--text-secondary)" }}>
                          {order.items.length} article{order.items.length > 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold" style={{ color: "var(--primary)" }}>
                          {order.total.toFixed(2)} €
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusSelect
                          value={order.status as OrderStatus}
                          onChange={(s) => handleStatusChange(order._id, s)}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {order.shippingAddress.line1}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                          className="flex items-center gap-1 text-xs font-medium transition-colors duration-150"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Détails
                          <ChevronDown
                            className={cn("w-3.5 h-3.5 transition-transform duration-200", isExpanded && "rotate-180")}
                          />
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${order._id}-detail`} style={{ backgroundColor: "var(--bg)" }}>
                        <td colSpan={6} className="px-5 py-4">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                              ARTICLES COMMANDÉS
                            </p>
                            {order.items.map((item: { _id: string; productName: string; price: number; quantity: number }) => (
                              <div
                                key={item._id}
                                className="flex items-center justify-between py-2 px-3 rounded-lg"
                                style={{ backgroundColor: "var(--surface)" }}
                              >
                                <span className="text-sm" style={{ color: "var(--text)" }}>
                                  {item.productName}
                                </span>
                                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                  x{item.quantity} · {(item.price * item.quantity).toFixed(2)} €
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
              Aucune commande
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Status Select ─── */
function StatusSelect({ value, onChange }: { value: OrderStatus; onChange: (s: OrderStatus) => void }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as OrderStatus)}
        className={cn(
          "appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-full cursor-pointer border-0 outline-none",
          STATUS_COLORS[value]
        )}
      >
        {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
    </div>
  );
}

/* ─── Products Tab ─── */
function ProductsTab() {
  const products = useQuery(api.products.adminListAll);
  const updateProduct = useMutation(api.products.update);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState("");
  const [editPrice, setEditPrice] = useState("");

  if (!products) return <LoadingState />;

  const startEdit = (product: { _id: Id<"products">; stock: number; price: number }) => {
    setEditingId(product._id);
    setEditStock(String(product.stock));
    setEditPrice(String(product.price));
  };

  const saveEdit = async (id: Id<"products">) => {
    await updateProduct({
      id,
      stock: parseInt(editStock),
      price: parseFloat(editPrice),
    });
    setEditingId(null);
  };

  const toggleActive = async (id: Id<"products">, current: boolean) => {
    await updateProduct({ id, isActive: !current });
  };

  const lowStock = products.filter((p) => p.stock <= 5 && p.isActive);

  return (
    <div className="space-y-4">
      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>{lowStock.length} produit{lowStock.length > 1 ? "s" : ""}</strong> en stock faible (≤ 5 unités) :{" "}
            {lowStock.map((p) => p.name).join(", ")}
          </span>
        </div>
      )}

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Produit</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Catégorie</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Prix</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Stock</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Statut</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isEditing = editingId === product._id;
                return (
                  <tr
                    key={product._id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                    className="hover:bg-[var(--bg)] transition-colors duration-100"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{ backgroundColor: "var(--primary-light)" }}
                        >
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-lg">🍯</span>
                          )}
                        </div>
                        <p className="font-medium" style={{ color: "var(--text)" }}>
                          {product.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
                        {product.category?.name || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 px-2 py-1 rounded-lg text-sm border outline-none"
                          style={{ borderColor: "var(--primary)", color: "var(--text)", backgroundColor: "var(--surface)" }}
                        />
                      ) : (
                        <span className="font-semibold" style={{ color: "var(--primary)" }}>
                          {product.price.toFixed(2)} €
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          className="w-16 px-2 py-1 rounded-lg text-sm border outline-none"
                          style={{ borderColor: "var(--primary)", color: "var(--text)", backgroundColor: "var(--surface)" }}
                        />
                      ) : (
                        <span
                          className={cn("font-medium", product.stock <= 5 && product.isActive && "text-amber-600")}
                          style={product.stock > 5 ? { color: "var(--text)" } : undefined}
                        >
                          {product.stock}
                          {product.stock <= 5 && product.isActive && (
                            <AlertTriangle className="w-3.5 h-3.5 inline ml-1 text-amber-500" />
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleActive(product._id, product.isActive)}
                        className={cn(
                          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200"
                        )}
                        style={{ backgroundColor: product.isActive ? "var(--accent)" : "var(--border)" }}
                      >
                        <span
                          className={cn(
                            "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200",
                            product.isActive ? "translate-x-4" : "translate-x-0.5"
                          )}
                        />
                      </button>
                      <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        {product.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(product._id)}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 text-white"
                              style={{ backgroundColor: "var(--accent)" }}
                            >
                              Sauver
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
                              style={{ backgroundColor: "var(--border)", color: "var(--text-secondary)" }}
                            >
                              Annuler
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(product)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
                            style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}
                          >
                            Modifier
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Clients Tab ─── */
function ClientsTab() {
  const orders = useQuery(api.orders.adminList);

  if (!orders) return <LoadingState />;

  // Derive unique clients from orders
  const clientMap = new Map<
    string,
    { name: string; email: string; orders: number; total: number; lastOrder: number }
  >();

  for (const order of orders) {
    const key = order.shippingAddress.email;
    if (!clientMap.has(key)) {
      clientMap.set(key, {
        name: order.shippingAddress.name,
        email: order.shippingAddress.email,
        orders: 0,
        total: 0,
        lastOrder: order._creationTime,
      });
    }
    const client = clientMap.get(key)!;
    client.orders += 1;
    if (["paid", "shipped", "delivered"].includes(order.status)) {
      client.total += order.total;
    }
    if (order._creationTime > client.lastOrder) {
      client.lastOrder = order._creationTime;
    }
  }

  const clients = Array.from(clientMap.values()).sort((a, b) => b.total - a.total);

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
              <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Client</th>
              <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Commandes</th>
              <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Total dépensé</th>
              <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--text-muted)" }}>Dernière commande</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr
                key={client.email}
                style={{ borderBottom: "1px solid var(--border)" }}
                className="hover:bg-[var(--bg)] transition-colors duration-100"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: i % 2 === 0 ? "var(--primary)" : "var(--accent)" }}
                    >
                      {client.name[0]}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--text)" }}>
                        {client.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {client.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}
                  >
                    {client.orders}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-semibold" style={{ color: "var(--primary)" }}>
                    {client.total.toFixed(2)} €
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {new Date(client.lastOrder).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12" style={{ color: "var(--text-muted)" }}>
                  Aucun client pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-6">
          <div className="skeleton h-4 rounded-full w-1/3 mb-3" />
          <div className="skeleton h-3 rounded-full w-2/3" />
        </div>
      ))}
    </div>
  );
}
