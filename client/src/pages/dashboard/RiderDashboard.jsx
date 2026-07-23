import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import RiderSidebar from "../../components/riderDashboard/RiderSidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderOrders from "../../components/riderDashboard/RiderOrders";
import RiderSettings from "../../components/riderDashboard/RiderSettings";
import RiderWishList from "../../components/riderDashboard/RiderWishList";



const RiderDashboard = () => {
  const [active, setActive] = useState("Overview");
  const { isLogin, role } = useAuth();

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
          {active === "Overview" && <RiderOverview />}
          {active === "Orders" && <RiderOrders />}
          {active === "Menu" && <RiderWishList />}
          {active === "Settings" && <RiderSettings />}
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;
