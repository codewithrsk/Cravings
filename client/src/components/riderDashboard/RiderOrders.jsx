import React, { useState, useMemo } from "react";

const TABS = [
  { label: "Assigned", value: "assigned" },
  { label: "Picked Up", value: "pickedUp" },
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delivered" },
];

const RiderOrders = ({ orders = [], setOrders, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState("assigned");

  const filteredOrders = useMemo(
    () => orders.filter((o) => o.status === activeTab),
    [orders, activeTab],
  );

  const advanceOrder = (order) => {
    if (order.status === "assigned") updateOrderStatus(order.id, "pickedUp");
    else if (order.status === "pickedUp") updateOrderStatus(order.id, "onTheWay");
    else if (order.status === "onTheWay") updateOrderStatus(order.id, "delivered");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">My Deliveries</h1>
            <p className="text-(--color-secondary) mt-1">Manage your assigned deliveries</p>
          </div>
          <div className="text-sm font-semibold bg-(--color-base-200) px-3 py-1 rounded">Total: {orders.length}</div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-(--color-base-300)">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeTab === tab.value
                  ? "bg-(--color-primary) text-(--color-primary-content) shadow-md"
                  : "bg-(--color-base-200) hover:bg-(--color-base-300)"
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-(--color-base-100)/30 px-2 py-0.5 rounded-full text-sm">{orders.filter((o) => o.status === tab.value).length}</span>
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-(--color-base-200) rounded-xl">No deliveries in this section.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-(--color-base-100) rounded-xl p-4 shadow-sm border border-(--color-base-300)">
                <div className="flex justify-between items-start border-b border-(--color-base-300) pb-3 mb-3">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-sm text-(--color-secondary)">{order.customer}</p>
                  </div>
                  <span className="text-xs bg-(--color-base-200) px-2 py-1 rounded">{order.time}</span>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-(--color-secondary)">Pickup</div>
                  <div className="font-medium">{order.pickupAddress}</div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-(--color-secondary)">Delivery</div>
                  <div className="font-medium">{order.deliveryAddress}</div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-bold">₹{order.total}</div>
                  <div>
                    {order.status !== "delivered" ? (
                      <button onClick={() => advanceOrder(order)} className="px-3 py-2 rounded bg-(--color-primary) text-(--color-primary-content)">Next</button>
                    ) : (
                      <span className="text-(--color-success) font-semibold">Delivered</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderOrders;