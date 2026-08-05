import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RiderSidebar from "../../components/riderDashboard/RiderSidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderOrders from "../../components/riderDashboard/RiderOrders";
import RiderSettings from "../../components/riderDashboard/RiderSettings";
import RiderWishList from "../../components/riderDashboard/RiderWishList";



const RiderDashboard = () => {
  const [active, setActive] = useState("Overview");
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();

  // Mock orders for rider dashboard (replace with API call later)
  const initialOrders = [
    {
      id: "#R-1001",
      customer: "Ankit Kumar",
      items: [{ qty: 1, name: "Veg Thali" }],
      total: 199,
      status: "assigned",
      time: "12:10 PM",
      pickupAddress: "Hotel Spice, MG Road",
      deliveryAddress: "Sector 12, Home",
    },
    {
      id: "#R-1002",
      customer: "Pooja R",
      items: [{ qty: 2, name: "Paneer Butter Masala" }],
      total: 349,
      status: "pickedUp",
      time: "12:25 PM",
      pickupAddress: "Tasty Bites, Link Road",
      deliveryAddress: "Lakeview Apt",
    },
    {
      id: "#R-1003",
      customer: "Vikram",
      items: [{ qty: 1, name: "Masala Dosa" }],
      total: 99,
      status: "onTheWay",
      time: "12:40 PM",
      pickupAddress: "South Cafe",
      deliveryAddress: "Green Park",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  if (!isLogin || role !== "rider") {
    return (
      <div className="h-[92vh] bg-[url('/foodTable.webp')]  bg-cover bg-center">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-(--color-neutral-content)">
            Access Denied. Please log in as a Admin to view this page.
          </h1>
          <button
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full shadow shadow-gray-500">
          <RiderSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full">
          {active === "Overview" && <RiderOverview orders={orders} />}
          {active === "Orders" && (
            <RiderOrders
              orders={orders}
              setOrders={setOrders}
              updateOrderStatus={updateOrderStatus}
            />
          )}
          {active === "WishList" && <RiderWishList />}
          {active === "Settings" && <RiderSettings />}
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;
