import React, { useState } from "react";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders";
import RestaurantSidebar from "../../components/restaurantDashboard/RestaurantSidebar";
import RestaurantWishList from "../../components/restaurantDashboard/RestaurantWishList";
import RestaurantSettings from "../../components/restaurantDashboard/RestaurantSettings";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import { useAuth } from "../../context/AuthContext";

const RestauantDashboard = () => {
  const [active, setActive] = useState("Overview");
  const { isLogin, role } = useAuth();
  if (!isLogin || role !== "restauant") {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full shadow shadow-gray-500">
          <RestaurantSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-5/6 border border-green-500 h-full">
          {active === "Overview" && <RestantOverview />}
          {active === "Orders" && <RestaurantOrders />}
          {active === "WishList" && <RestaurantWishList />}
          {active === "Settings" && <RestaurantSettings />}
        </div>
      </div>
    </>
  );
};

export default RestauantDashboard;
