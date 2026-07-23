import React, { useState, useEffect } from "react";
import { MdEdit, MdCheck, MdClose, MdDelete, MdAdd } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";
import RunningLoader from "../../../assets/runningLoader.gif";

const ResturantCoreDetails = () => {
  const { user } = useAuth();

  // Common State variables
  const [isLoading, setIsLoading] = useState(false);

  // Restaurant handlers
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [editingRestaurant, setEditingRestaurant] = useState(false);

  const [restaurantFormData, setRestaurantFormData] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    geoLat: "",
    geoLon: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    panCard: "",
    gst: "",
    fssai: "",
    socialMediaLinks: [],
  });

  // Sync state when restaurantData is fetched
  useEffect(() => {
    if (restaurantData) {
      setRestaurantFormData({
        address: restaurantData.address || "",
        city: restaurantData.city || "",
        state: restaurantData.state || "",
        pinCode: restaurantData.pinCode || "",
        country: restaurantData.country || "",
        geoLat: restaurantData.geoLocation?.lat || "",
        geoLon: restaurantData.geoLocation?.lon || "",
        bankName: restaurantData.bankingDetails?.bankName || "",
        accountNumber: restaurantData.bankingDetails?.accountNumber || "",
        ifscCode: restaurantData.bankingDetails?.ifscCode || "",
        panCard: restaurantData.documents?.panCard || "",
        gst: restaurantData.documents?.gst || "",
        fssai: restaurantData.documents?.fssai || "",
        socialMediaLinks: restaurantData.socialMediaLinks || [],
      });
    }
  }, [restaurantData]);

  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updated = restaurantFormData.socialMediaLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setRestaurantFormData((prev) => ({ ...prev, socialMediaLinks: updated }));
  };

  const addSocialMediaLink = () => {
    setRestaurantFormData((prev) => ({
      ...prev,
      socialMediaLinks: [...prev.socialMediaLinks, { platform: "", url: "" }],
    }));
  };

  const removeSocialMediaLink = (index) => {
    setRestaurantFormData((prev) => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);
      // Prepare payload for restaurant update
      console.log("restaurantFormData payload:", restaurantFormData);

      // Simulate API call
      // await api.put(`/restaurant/update-core-data?id=${user._id}`, restaurantFormData);

      toast.success("Restaurant core details updated successfully!");
      setEditingRestaurant(false);
      // fetchRestaurantData(); // Re-fetch to confirm sync
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setRestaurantFormData((prev) => ({
          ...prev,
          geoLat: position.coords.latitude,
          geoLon: position.coords.longitude,
        }));
      });
    } catch (error) {}
  };

  const handleCancelRestaurant = () => {
    if (restaurantData) {
      // Revert to original fetched data
      setRestaurantFormData({
        address: restaurantData.address || "",
        city: restaurantData.city || "",
        state: restaurantData.state || "",
        pinCode: restaurantData.pinCode || "",
        country: restaurantData.country || "",
        geoLat: restaurantData.geoLocation?.lat || "",
        geoLon: restaurantData.geoLocation?.lon || "",
        bankName: restaurantData.bankingDetails?.bankName || "",
        accountNumber: restaurantData.bankingDetails?.accountNumber || "",
        ifscCode: restaurantData.bankingDetails?.ifscCode || "",
        panCard: restaurantData.documents?.panCard || "",
        gst: restaurantData.documents?.gst || "",
        fssai: restaurantData.documents?.fssai || "",
        socialMediaLinks: restaurantData.socialMediaLinks || [],
      });
    }
    setEditingRestaurant(false);
  };

  const fetchRestaurantData = async () => {
    if (!user?._id) return;
    try {
      setIsLoadingRestaurant(true);
      setLoadingRestaurantError(null);
      // const res = await api.get(`/restaurant/get-resturant-data?id=${user._id}`);
      // setRestaurantData(res.data.data);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Unknown error occurred fetching restaurant.";
      toast.error(errMsg);
      setLoadingRestaurantError(errMsg);
    } finally {
      setIsLoadingRestaurant(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [user?._id]);

  // Standardized UI Helper Classes mapped to your CSS Variables
  const inputBaseClass =
    "w-full px-3 py-2 text-sm border outline-none rounded-lg transition-all duration-200 focus:ring-2 focus:ring-(--color-primary)";
  const inputDisabledClass =
    "bg-(--color-base-200) border-(--color-base-300) text-(--color-secondary) cursor-not-allowed opacity-80";
  const inputEnabledClass =
    "bg-(--color-base-100) border-(--color-secondary) text-(--color-base-content) hover:border-(--color-primary)";

  return (
    <div className="overflow-y-auto h-full p-4 md:p-6 space-y-6 bg-(--color-base-200)">
      {isLoadingRestaurant ? (
        <div className="flex flex-col justify-center items-center h-64 bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300)">
          <img
            src={RunningLoader}
            alt="Loading..."
            className="w-24 h-24 mb-4 opacity-80"
          />
          <span className="text-sm text-(--color-primary) font-semibold animate-pulse">
            Fetching Core Details...
          </span>
        </div>
      ) : loadingRestaurantError ? (
        <div className="flex justify-center items-center h-40 bg-red-50/50 rounded-2xl border border-(--color-error) text-(--color-error) font-medium">
          {loadingRestaurantError}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header & Global Actions */}
          <div className="bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300) p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-(--color-primary)">
                  Core Operations Data
                </h2>
                <p className="text-sm text-(--color-secondary) mt-1">
                  Manage address, banking, and social integrations
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                {!editingRestaurant ? (
                  <button
                    onClick={() => setEditingRestaurant(true)}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <MdEdit size={18} /> Edit Core Details
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelRestaurant}
                      className="flex items-center gap-2 bg-(--color-base-300) text-(--color-base-content) px-4 py-2 rounded-lg text-sm font-medium hover:brightness-95 transition-all"
                      disabled={isLoading}
                    >
                      <MdClose size={18} /> Cancel
                    </button>
                    <button
                      onClick={handleSaveRestaurant}
                      className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Saving..."
                      ) : (
                        <>
                          <MdCheck size={18} /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location & Address Section */}
          <div className="bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300) p-6 relative">
            <div className="mb-5 border-b border-(--color-base-300) pb-3 flex justify-between items-center">
              <h3 className="text-lg font-bold text-(--color-primary)">
                Location & Address
              </h3>
              {editingRestaurant && (
                <>
                  <button
                    onClick={handleGetLocation}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Getting Current Location..."
                      : "Get Current Location"}
                  </button>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="w-full space-y-1.5 md:col-span-4">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Full Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={restaurantFormData.address}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={restaurantFormData.city}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={restaurantFormData.state}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={restaurantFormData.pinCode}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-1">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={restaurantFormData.country}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Geo-Latitude
                </label>
                <input
                  type="text"
                  name="geoLat"
                  value={restaurantFormData.geoLat}
                  onChange={handleRestaurantChange}
                  placeholder="e.g. 28.6139"
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Geo-Longitude
                </label>
                <input
                  type="text"
                  name="geoLon"
                  value={restaurantFormData.geoLon}
                  onChange={handleRestaurantChange}
                  placeholder="e.g. 77.2090"
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>
            </div>
          </div>

          {/* Banking & Documents Section */}
          <div className="bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300) p-6 relative">
            <div className="mb-5 border-b border-(--color-base-300) pb-3 flex justify-between items-center">
              <h3 className="text-lg font-bold text-(--color-primary)">
                Banking & Compliance Documents
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={restaurantFormData.bankName}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={restaurantFormData.accountNumber}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={restaurantFormData.ifscCode}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  PAN Card Number
                </label>
                <input
                  type="text"
                  name="panCard"
                  value={restaurantFormData.panCard}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} uppercase ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gst"
                  value={restaurantFormData.gst}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} uppercase ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  FSSAI License Code
                </label>
                <input
                  type="text"
                  name="fssai"
                  value={restaurantFormData.fssai}
                  onChange={handleRestaurantChange}
                  className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingRestaurant}
                />
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="bg-(--color-base-100) mb-8 rounded-2xl shadow-sm border border-(--color-base-300) p-6 relative">
            <div className="mb-5 border-b border-(--color-base-300) pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-(--color-primary)">
                  Social Media Channels
                </h3>
                <p className="text-sm text-(--color-secondary) mt-1">
                  Connect your brand across platforms
                </p>
              </div>

              {editingRestaurant && (
                <button
                  type="button"
                  onClick={addSocialMediaLink}
                  className="flex items-center gap-1.5 bg-(--color-base-200) text-(--color-primary) border border-(--color-primary) px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-(--color-primary) hover:text-(--color-primary-content) transition-colors"
                >
                  <MdAdd size={16} /> Add Channel
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {restaurantFormData.socialMediaLinks.length === 0 ? (
                <div className="text-center py-6 bg-(--color-base-200) rounded-xl border border-dashed border-(--color-secondary)">
                  <p className="text-sm text-(--color-secondary)">
                    No social media links connected.
                  </p>
                  {editingRestaurant && (
                    <p
                      className="text-xs text-(--color-primary) mt-1 cursor-pointer"
                      onClick={addSocialMediaLink}
                    >
                      Click "Add Channel" to start.
                    </p>
                  )}
                </div>
              ) : (
                restaurantFormData.socialMediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-3 items-start md:items-center p-3 bg-(--color-base-200)/50 rounded-xl border border-(--color-base-300)"
                  >
                    <div className="w-full md:w-1/3 space-y-1">
                      <label className="text-xs font-semibold text-(--color-secondary) md:hidden">
                        Platform
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Instagram, Facebook"
                        value={link.platform}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            index,
                            "platform",
                            e.target.value,
                          )
                        }
                        className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                        disabled={!editingRestaurant}
                      />
                    </div>

                    <div className="w-full md:w-2/3 flex items-center gap-2">
                      <div className="w-full space-y-1">
                        <label className="text-xs font-semibold text-(--color-secondary) md:hidden">
                          URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={link.url}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              index,
                              "url",
                              e.target.value,
                            )
                          }
                          className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                          disabled={!editingRestaurant}
                        />
                      </div>

                      {editingRestaurant && (
                        <button
                          type="button"
                          onClick={() => removeSocialMediaLink(index)}
                          className="mt-5 md:mt-0 p-2 text-(--color-secondary) hover:text-(--color-error) bg-(--color-base-100) hover:bg-red-50 rounded-lg transition-colors border border-(--color-base-300)"
                          title="Remove Link"
                        >
                          <MdDelete size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResturantCoreDetails;
