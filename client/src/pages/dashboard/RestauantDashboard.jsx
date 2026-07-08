import React, { useState } from "react";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders";
import RestaurantSidebar from "../../components/restaurantDashboard/RestaurantSidebar";
import RestaurantWishList from "../../components/restaurantDashboard/RestaurantWishList";
import RestaurantSettings from "../../components/restaurantDashboard/RestaurantSettings";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";


const RestauantDashboard = () => {
  const [active, setActive] = useState("Overview");

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