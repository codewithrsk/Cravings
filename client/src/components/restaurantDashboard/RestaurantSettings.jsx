import React, { useEffect, useState } from "react";
import RestaurantInformation from "./settings/RestaurantInformation";
import ResturantCoreDetails from "./settings/ResturantCoreDetails";
import RestaurantPhotos from "./settings/RestaurantPhotos";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

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

  const handalChangeOpen = () => {
    setIsRestaurantOpen(!isRestaurantOpen);
  };

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(
    sessionStorage.getItem("RestaurantOpen") || false,
  );

  const [isLoadingResturantOpen, setIsLoadingResturantOpen] = useState(true);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState();

  const handleRestaurantOpen = async () => {
    try {
      setIsLoadingResturantOpen(true);
      console.log("enter in api");

      const res = await api.patch(
        `/restaurant/change-open-status/${!isRestaurantOpen}?id=${user._id}`,
      );
      console.log("api hit");

      setIsRestaurantOpen(res.data.data.isOpen);
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );
      sessionStorage.setItem("RestaurantOpen", res.data.data.isOpen);

      toast.success(res.data.message);
    } catch (error) {
      console.log("get error");

      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while Opening the Restaurant. Please try again.",
      );
    } finally {
      setIsLoadingResturantOpen(false);
    }
  };

  return (
    <>
      <div className=" h-full  flex flex-col p-4 ">
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
              onClick={handleRestaurantOpen}
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
