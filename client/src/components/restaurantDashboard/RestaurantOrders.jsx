import React, { useState } from "react";

const RestaurantOrders = () => {
  // Mock data
  const initialOrders = [
    {
      id: "#ORD-092",
      customer: "Rahul Sharma",
      items: [
        { qty: 2, name: "Paneer Tikka" },
        { qty: 1, name: "Garlic Naan" },
      ],
      total: 540,
      status: "new",
      time: "8:02 PM",
    },
    {
      id: "#ORD-091",
      customer: "Priya Patel",
      items: [
        { qty: 1, name: "Veg Biryani" },
        { qty: 2, name: "Raita" },
      ],
      total: 320,
      status: "preparing",
      time: "7:45 PM",
    },
    {
      id: "#ORD-090",
      customer: "Amit Singh",
      items: [
        { qty: 4, name: "Tandoori Roti" },
        { qty: 1, name: "Dal Makhani" },
      ],
      total: 280,
      status: "ready",
      time: "7:30 PM",
    },
    {
      id: "#ORD-089",
      customer: "Neha Gupta",
      items: [{ qty: 1, name: "Masala Dosa" }],
      total: 150,
      status: "completed",
      time: "7:15 PM",
    },
  ];

  const TABS = [
    { label: "New Orders", value: "new" },
    { label: "Preparing", value: "preparing" },
    { label: "Ready for Pickup", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("new");

  // Filter orders
  const filteredOrders = orders.filter(
    (order) => order.status === activeTab
  );

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-(--color-base-100) text-(--color-base-content) font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Live Orders</h1>
            <p className="text-(--color-secondary) mt-1">
              Manage and track customer deliveries
            </p>
          </div>

          <div className="bg-(--color-base-200) px-4 py-2 rounded-lg font-semibold shadow-sm border border-(--color-base-300)">
            Total Orders Today:{" "}
            <span className="text-(--color-primary)">{orders.length}</span>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-(--color-base-300)">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 rounded-t-lg font-medium transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-(--color-primary) text-(--color-primary-content) shadow-md"
                  : "bg-(--color-base-200) hover:bg-(--color-base-300)"
              }`}
            >
              {tab.label}

              <span className="ml-2 bg-(--color-base-100)/30 px-2 py-0.5 rounded-full text-sm">
                {orders.filter((o) => o.status === tab.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-(--color-base-200) rounded-xl border border-(--color-base-300)">
            <h3 className="text-xl font-medium">
              No orders in this section.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-(--color-base-200) rounded-xl p-5 shadow-sm border border-(--color-base-300) hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start border-b border-(--color-base-300) pb-3 mb-4">
                  <div>
                    <h2 className="text-lg font-bold">{order.id}</h2>
                    <p className="text-sm text-(--color-secondary)">
                      {order.customer}
                    </p>
                  </div>

                  <span className="text-xs bg-(--color-base-300) px-2 py-1 rounded-md">
                    {order.time}
                  </span>
                </div>

                {/* Items */}
                <div className="flex-1">
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>
                          <span className="font-bold text-(--color-primary) mr-2">
                            {item.qty}×
                          </span>
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-(--color-base-300) flex justify-between items-center">
                  <h3 className="text-xl font-bold">
                    ₹{order.total}
                  </h3>

                  {order.status === "new" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order.id, "preparing")
                      }
                      className="px-4 py-2 rounded-lg font-semibold bg-(--color-primary) text-(--color-primary-content) hover:opacity-90 transition-all shadow-sm"
                    >
                      Accept & Prepare
                    </button>
                  )}

                  {order.status === "preparing" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order.id, "ready")
                      }
                      className="px-4 py-2 rounded-lg font-semibold bg-(--color-info) text-(--color-info-content) hover:opacity-90 transition-all shadow-sm"
                    >
                      Mark Ready
                    </button>
                  )}

                  {order.status === "ready" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order.id, "completed")
                      }
                      className="px-4 py-2 rounded-lg font-semibold bg-(--color-success) text-(--color-success-content) hover:opacity-90 transition-all shadow-sm"
                    >
                      Hand to Delivery
                    </button>
                  )}

                  {order.status === "completed" && (
                    <span className="text-(--color-success) font-semibold">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantOrders;