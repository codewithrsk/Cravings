import React, { useEffect, useState } from "react";
import RestaurantInformation from "./settings/RestaurantInformation";
import ResturantCoreDetails from "./settings/ResturantCoreDetails";
import RestaurantPhotos from "./settings/RestaurantPhotos";
import { useAuth } from "../../context/AuthContext";

const RestaurantSetting = () => {
  const { user } = useAuth();
  // useEffect(async () => {
  //   const req = await api.get("/resturent/isOpen");
  // }, [user]);
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];
  const [activeTab, setActiveTab] = useState("information");

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const handalChangeOpen = () => {
    setIsRestaurantOpen(!isRestaurantOpen);
  };

  return (
    <>
      <div className=" h-full flex flex-col p-4">
        <div className="border-b border-(--color-secondary)/50 flex justify-between mb-2 w-full">
          <div className="flex gap-3 ">
            {Tabs.map((tab, idx) => (
              <>
                <div
                  key={idx}
                  className={`p-2 uppercase cursor-pointer ${activeTab === tab.id ? "text-(--color-primary) border-b-3 border-(--color-primary)" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </div>
              </>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="w-22 text-xs font-semibold">Currently Open</label>
            <button
              onClick={handalChangeOpen}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isRestaurantOpen ? "bg-(--color-primary)" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
                  isRestaurantOpen ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className="h-full rounded-lg bg-(--color-base-200) p-2">
          {activeTab === "information" && <RestaurantInformation />}
          {activeTab === "coreDetails" && <ResturantCoreDetails />}
          {activeTab === "photos" && <RestaurantPhotos />}
        </div>
      </div>
    </>
  );
};

export default RestaurantSetting;
