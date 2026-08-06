import React, { useState, useEffect } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
// import CoreDetails from "./settings/coreDetails/Index";
// import Information from "./settings/restaurantInformation/Index";
// import RestaurantPhotos from "./settings/RestaurantPhotos";
import Loader from "../../components/Loader";
import { IoMdHammer } from "react-icons/io";

const RiderSetting = () => {
  const { user } = useAuth();
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];
  const [activeTab, setActiveTab] = useState("information");

  const [isLoadingResturantOpen, setIsLoadingResturantOpen] = useState(true);
  const [isRiderAvailable, setIsRiderAvailable] = useState(
    () => sessionStorage.getItem("RiderAvailable") === "true",
  );

  const [isLoadingRider, setIsLoadingRider] = useState(false);
  const [loadingRiderError, setLoadingRiderError] = useState(null);
  const [riderData, setRiderData] = useState();

  const fetchRiderData = async () => {
    try {
      setIsLoadingRider(true);
      setIsLoadingResturantOpen(true);

      const res = await api.get(`/rider/profile?id=${user._id}`);
      setRiderData(res.data.data);
      sessionStorage.setItem("cravingRider", JSON.stringify(res.data.data));
      sessionStorage.setItem("RiderAvailable", res.data.data.isAvailable);

      setIsRiderAvailable(res.data.data.isAvailable);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching rider details. Please try again.",
      );
      setLoadingRiderError(
        error.response?.data?.message ||
          "Unknown error occurred fetching rider details. Please try again.",
      );
    } finally {
      setIsLoadingRider(false);
      setIsLoadingResturantOpen(false);
    }
  };

  const handleRiderAvailability = async () => {
    try {
      setIsLoadingResturantOpen(true);

      const res = await api.patch(`/rider/availability/${!isRiderAvailable}?id=${user._id}`);
      setIsRiderAvailable(res.data.data.isAvailable);
      setRiderData(res.data.data);
      sessionStorage.setItem("cravingRider", JSON.stringify(res.data.data));
      sessionStorage.setItem("RiderAvailable", res.data.data.isAvailable);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while updating rider availability. Please try again.",
      );
    } finally {
      setIsLoadingResturantOpen(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRiderData();
    }
  }, [user]);

  return (
    <>
      <div className="h-full flex flex-col">
        {isLoadingRider ? (
          <Loader height="100%" width="100%" />
        ) : (
          <>
            <div className="rounded-3xl border border-(--color-base-300) bg-(--color-base-100) p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-3 py-1 text-sm uppercase font-semibold tracking-[0.2em] text-(--color-primary)">
                    <IoMdHammer className="text-lg" /> Rider Settings
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-(--color-primary)">
                      {riderData?.fullName || "Rider settings"}
                    </h1>
                    <p className="text-sm text-(--color-secondary) max-w-2xl">
                      Manage rider information, vehicle details, and current address from one dashboard.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-(--color-secondary)/20 bg-(--color-base-200) p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-(--color-secondary)">
                      Current status
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-base font-semibold text-(--color-primary)">
                        {isRiderAvailable ? "Available for rides" : "Offline"}
                      </span>
                      <button
                        onClick={handleRiderAvailability}
                        className={`relative inline-flex h-9 w-20 items-center rounded-full transition-colors duration-300 ${
                          isRiderAvailable ? "bg-(--color-primary)" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white transition-transform duration-300 ${
                            isRiderAvailable ? "translate-x-11" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
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
          </>
        )}
      </div>
    </>
  );
};

export default RiderSetting;