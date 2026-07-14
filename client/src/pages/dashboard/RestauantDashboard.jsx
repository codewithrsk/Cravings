import React, { useState } from "react";
import RestaurantSidebar from "../../components/restaurantDashboard/RestaurantSidebar";
import RestantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders";
import RestaurantSettings from "../../components/restaurantDashboard/RestaurantSettings";
import RestaurantWishList from "../../components/restaurantDashboard/RestaurantWishList";

import { useAuth } from "../../context/AuthContext";

const RestauantDashboard = () => {
  const [active, setActive] = useState("Overview");

  const { isLogin, role } = useAuth();
  if (!isLogin || role !== "restaurant") {
    return (
      <>
        <div className="h-[92vh] flex items-center justify-center">
          <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
            <h1 className="text-2xl font-bold text-(--color-neutral-content)">
              Access Denied. Please log in as a {role} to view this page.
            </h1>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <div className="flex h-[92vh] overflow-hidden">
        <div className=" border border-red-500 h-full shadow shadow-gray-500">
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
