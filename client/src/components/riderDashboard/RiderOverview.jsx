import React from "react";

const RiderOverview = ({ orders = [] }) => {
  const totalOrders = orders.length;
  const assigned = orders.filter((o) => o.status === "assigned").length;
  const pickedUp = orders.filter((o) => o.status === "pickedUp").length;
  const onTheWay = orders.filter((o) => o.status === "onTheWay").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const totalEarnings = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="text-2xl font-bold">Rider Overview</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-(--color-base-100) rounded shadow">
          <div className="text-sm text-(--color-secondary)">Total Orders</div>
          <div className="text-xl font-semibold">{totalOrders}</div>
        </div>

        <div className="p-4 bg-(--color-base-100) rounded shadow">
          <div className="text-sm text-(--color-secondary)">Assigned</div>
          <div className="text-xl font-semibold">{assigned}</div>
        </div>

        <div className="p-4 bg-(--color-base-100) rounded shadow">
          <div className="text-sm text-(--color-secondary)">In Transit</div>
          <div className="text-xl font-semibold">{pickedUp + onTheWay}</div>
        </div>

        <div className="p-4 bg-(--color-base-100) rounded shadow">
          <div className="text-sm text-(--color-secondary)">Delivered</div>
          <div className="text-xl font-semibold">{delivered}</div>
        </div>
      </div>

      <div className="p-4 bg-(--color-base-100) rounded shadow">
        <div className="text-sm text-(--color-secondary)">Total Earnings</div>
        <div className="text-2xl font-bold">₹{totalEarnings}</div>
      </div>
    </div>
  );
};

export default RiderOverview;
