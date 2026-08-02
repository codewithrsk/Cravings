import React, { useState, useEffect } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import CoreDetails from "./settings/coreDetails/Index";
import Information from "./settings/restaurantInformation/Index";
import RestaurantPhotos from "./settings/RestaurantPhotos";
import Loader from "../../components/Loader";
import { IoMdHammer } from "react-icons/io";

const RestaurantSetting = () => {
  const { user } = useAuth();
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];
  const [activeTab, setActiveTab] = useState("information");

  const [isLoadingResturantOpen, setIsLoadingResturantOpen] = useState(true);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(
    () => sessionStorage.getItem("RestaurantOpen") === "true",
  );

  //Load Restaurant Data
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState();

  const fetchRestaurantData = async () => {
    try {
      setIsLoadingRestaurant(true);
      setIsLoadingResturantOpen(true);

      const res = await api.get(
        `/restaurant/get-resturant-data?id=${user._id}`,
      );
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );
      sessionStorage.setItem("RestaurantOpen", res.data.data.isOpen);

      setIsRestaurantOpen(res.data.data.isOpen);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
      setLoadingRestaurantError(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
    } finally {
      setIsLoadingRestaurant(false);
      setIsLoadingResturantOpen(false);
    }
  };

  const handleRestaurantOpen = async () => {
    try {
      setIsLoadingResturantOpen(true);

      const res = await api.patch(
        `/restaurant/change-open-status/${!isRestaurantOpen}?id=${user._id}`,
      );
      setIsRestaurantOpen(res.data.data.isOpen);
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );
      sessionStorage.setItem("RestaurantOpen", res.data.data.isOpen);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while Opening the Restaurant. Please try again.",
      );
    } finally {
      setIsLoadingResturantOpen(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRestaurantData();
    }
  }, [user]);

  return (
    <>
      <div className=" h-full flex flex-col">
        {isLoadingRestaurant ? (
          <Loader height="100%" width="100%" />
        ) : (
          <>
          <div className="rounded-3xl border border-(--color-base-300) bg-(--color-base-100) p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-3 py-1 text-sm uppercase font-semibold tracking-[0.2em] text-(--color-primary)">
                  <IoMdHammer className="text-lg" /> Restaurant Settings
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-(--color-primary)">
                    {restaurantData?.restaurantName || "Restaurant settings"}
                  </h1>
                  <p className="text-sm text-(--color-secondary) max-w-2xl">
                    Manage restaurant info, core business details, and photo galleries from one dashboard.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-(--color-secondary)/20 bg-(--color-base-200) p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-(--color-secondary)">Current status</div>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-(--color-primary)">{isRestaurantOpen ? "Open for orders" : "Closed"}</span>
                    <button
                      onClick={handleRestaurantOpen}
                      className={`relative inline-flex h-9 w-20 items-center rounded-full transition-colors duration-300 ${
                        isRestaurantOpen ? "bg-(--color-primary)" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white transition-transform duration-300 ${
                          isRestaurantOpen ? "translate-x-11" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                
              </div>
              
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {Tabs.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-(--color-primary) text-(--color-primary-content) shadow-sm"
                      : "bg-(--color-base-200) text-(--color-secondary) hover:bg-(--color-base-300)"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
            
            <div className="h-full rounded-lg bg-(--color-base-200) p-2 overflow-y-auto">
              {activeTab === "information" && <Information />}
              {activeTab === "coreDetails" && <CoreDetails />}
              {activeTab === "photos" && <RestaurantPhotos />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantSetting;