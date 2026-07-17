import React, { useState, useEffect } from "react";
import {
  MdEdit,
  MdOutlineAddAPhoto,
  MdOutlineLockReset,
  MdCheck,
  MdClose,
} from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";
import PasswordChangeModal from "../../commonModals/PasswordChangeModal";
import RunningLoader from "../../../assets/runningLoader.gif";

const RestaurantInformation = () => {
  const { user, setUser } = useAuth();

  // Common State variables
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // Profile handlers
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profileFormData, setProfileFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Restaurant handlers
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [editingRestaurant, setEditingRestaurant] = useState(false);

  const [restaurantFormData, setRestaurantFormData] = useState({
    restaurantName: "",
    description: "",
    restaurantType: "",
    cuisineTypes: "",
    isOpen: false,
    contactEmail: "",
    contactPhone: "",
    openingTime: "",
    closingTime: "",
    legalName: "",
    companyType: "",
  });

  // Sync state when restaurantData is fetched
  useEffect(() => {
    if (restaurantData) {
      setRestaurantFormData({
        restaurantName: restaurantData.restaurantName || "",
        description: restaurantData.description || "",
        restaurantType: restaurantData.restaurantType || "",
        cuisineTypes: restaurantData.cuisineTypes?.join(", ") || "",
        isOpen: restaurantData.isOpen || false,
        contactEmail: restaurantData.contactDetails?.email || "",
        contactPhone: restaurantData.contactDetails?.phone || "",
        openingTime: restaurantData.servingHours?.openingTime || "",
        closingTime: restaurantData.servingHours?.closingTime || "",
        legalName: restaurantData.legalInformation?.legalName || "",
        companyType: restaurantData.legalInformation?.companyType || "",
      });
    }
  }, [restaurantData]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const payload = new FormData();
      payload.append("fullName", profileFormData.fullName);
      payload.append("email", profileFormData.email.toLowerCase());
      payload.append("phone", profileFormData.phone);

      if (profilePic) {
        payload.append("displayPic", profilePic);
      }

      const response = await api.put(`/common/edit-profile`, payload);
      setUser(response.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));
      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setProfileFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setProfilePicPreview(null);
    setProfilePic(null);
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);
      const payload = {
        restaurantName: restaurantFormData.restaurantName,
        description: restaurantFormData.description,
        restaurantType: restaurantFormData.restaurantType,
        cuisineTypes: restaurantFormData.cuisineTypes
          .split(",")
          .map((c) => c.trim()),
        isOpen: restaurantFormData.isOpen,
        contactDetails: {
          email: restaurantFormData.contactEmail,
          phone: restaurantFormData.contactPhone,
        },
        servingHours: {
          openingTime: restaurantFormData.openingTime,
          closingTime: restaurantFormData.closingTime,
        },
        legalInformation: {
          legalName: restaurantFormData.legalName,
          companyType: restaurantFormData.companyType,
        },
      };

      await api.put(`/restaurant/update-profile`, payload);
      toast.success("Restaurant information updated successfully!");
      setEditingRestaurant(false);
      fetchRestaurantData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRestaurant = () => {
    if (restaurantData) {
      setRestaurantFormData({
        restaurantName: restaurantData.restaurantName || "",
        description: restaurantData.description || "",
        restaurantType: restaurantData.restaurantType || "",
        cuisineTypes: restaurantData.cuisineTypes?.join(", ") || "",
        isOpen: restaurantData.isOpen || false,
        contactEmail: restaurantData.contactDetails?.email || "",
        contactPhone: restaurantData.contactDetails?.phone || "",
        openingTime: restaurantData.servingHours?.openingTime || "",
        closingTime: restaurantData.servingHours?.closingTime || "",
        legalName: restaurantData.legalInformation?.legalName || "",
        companyType: restaurantData.legalInformation?.companyType || "",
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

  // Refactored UI Helper Classes using your CSS Variables
  const inputBaseClass =
    "w-full px-3 py-2 text-sm border outline-none rounded-lg transition-all duration-200 focus:ring-2 focus:ring-(--color-primary)";
  const inputDisabledClass =
    "bg-(--color-base-200) border-(--color-base-300) text-(--color-secondary) cursor-not-allowed opacity-80";
  const inputEnabledClass =
    "bg-(--color-base-100) border-(--color-secondary) text-(--color-base-content) hover:border-(--color-primary)";

  return (
    <>
      <div className="overflow-y-auto h-full p-4 pb-44 md:p-6 space-y-6 bg-(--color-base-200)">
        {/* --- USER PROFILE SECTION --- */}
        <div className="bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300) p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 border-b border-(--color-base-300) pb-4">
            <div>
              <h3 className="text-lg font-bold text-(--color-primary)">
                Profile Information
              </h3>
              <p className="text-sm text-(--color-secondary) mt-1">
                Manage your personal details and security
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              {!editingProfile ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsPasswordChangeModalOpen(true)}
                    className="flex items-center gap-2 border border-(--color-primary) text-(--color-primary) px-4 py-2 rounded-lg text-sm font-medium hover:bg-(--color-primary) hover:text-(--color-primary-content) transition-colors"
                  >
                    <MdOutlineLockReset size={18} /> Change Password
                  </button>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <MdEdit size={16} /> Edit Profile
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelProfile}
                    className="flex items-center gap-2 bg-(--color-base-300) text-(--color-base-content) px-4 py-2 rounded-lg text-sm font-medium hover:brightness-95 transition-all"
                    disabled={isLoading}
                  >
                    <MdClose size={16} /> Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
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

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Picture */}
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-inner border-4 border-(--color-base-200) bg-(--color-base-300)">
                <img
                  src={
                    profilePicPreview ||
                    user?.photo?.url ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {editingProfile && (
                <label
                  htmlFor="profilePic"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                >
                  <MdOutlineAddAPhoto size={28} className="mb-2" />
                  <span className="text-xs font-medium">Change Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    id="profilePic"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
              )}
            </div>

            {/* Profile Form Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileFormData.fullName}
                  onChange={handleProfileChange}
                  className={`${inputBaseClass} ${editingProfile ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingProfile}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="text-sm font-semibold text-(--color-base-content)">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileFormData.phone}
                  onChange={handleProfileChange}
                  className={`${inputBaseClass} ${editingProfile ? inputEnabledClass : inputDisabledClass}`}
                  disabled={!editingProfile}
                />
              </div>

              <div className="w-full space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-(--color-base-content) flex items-center justify-between">
                  Email Address
                  <span className="text-xs text-(--color-secondary) font-normal">
                    Cannot be changed
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileFormData.email}
                  className={`${inputBaseClass} bg-(--color-base-200) border-(--color-base-300) text-(--color-secondary) cursor-not-allowed`}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- RESTAURANT & LEGAL INFORMATION SECTIONS --- */}
        {isLoadingRestaurant ? (
          <div className="flex flex-col justify-center items-center h-64 bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300)">
            <img
              src={RunningLoader}
              alt="Loading..."
              className="w-24 h-24 mb-4 opacity-80"
            />
            <span className="text-sm text-(--color-primary) font-semibold animate-pulse">
              Fetching Restaurant Details...
            </span>
          </div>
        ) : loadingRestaurantError ? (
          <div className="flex justify-center items-center h-40 bg-red-50/50 rounded-2xl border border-(--color-error) text-(--color-error) font-medium">
            {loadingRestaurantError}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Restaurant Info Card */}
            <div className="bg-(--color-base-100) rounded-2xl shadow-sm border border-(--color-base-300) p-6 relative">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 border-b border-(--color-base-300) pb-4">
                <div>
                  <h3 className="text-lg font-bold text-(--color-primary)">
                    Restaurant Information
                  </h3>
                  <p className="text-sm text-(--color-secondary) mt-1">
                    Update your operational and contact details
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  {!editingRestaurant ? (
                    <button
                      onClick={() => setEditingRestaurant(true)}
                      className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <MdEdit size={16} /> Edit Details
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancelRestaurant}
                        className="flex items-center gap-2 bg-(--color-base-300) text-(--color-base-content) px-4 py-2 rounded-lg text-sm font-medium hover:brightness-95 transition-all"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveRestaurant}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="w-full space-y-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-(--color-base-content)">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={restaurantFormData.restaurantName}
                    onChange={handleRestaurantChange}
                    className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-sm font-semibold text-(--color-base-content)">
                    Dietary Focus
                  </label>
                  <select
                    name="restaurantType"
                    value={restaurantFormData.restaurantType}
                    onChange={handleRestaurantChange}
                    className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  >
                    <option value="" disabled>
                      Select focus
                    </option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="jain">Jain</option>
                    <option value="vegan">Vegan</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="w-full space-y-1.5 md:col-span-3">
                  <label className="text-sm font-semibold text-(--color-base-content) flex justify-between">
                    Cuisine Types
                    <span className="text-xs text-(--color-secondary) font-normal">
                      Separate with commas (e.g. Indian, Chinese)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="cuisineTypes"
                    value={restaurantFormData.cuisineTypes}
                    onChange={handleRestaurantChange}
                    placeholder="Indian, Italian, Chinese..."
                    className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-sm font-semibold text-(--color-base-content)">
                    Public Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={restaurantFormData.contactEmail}
                    onChange={handleRestaurantChange}
                    className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-sm font-semibold text-(--color-base-content)">
                    Public Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={restaurantFormData.contactPhone}
                    onChange={handleRestaurantChange}
                    className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-base-content)">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      value={restaurantFormData.openingTime}
                      onChange={handleRestaurantChange}
                      className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-base-content)">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closingTime"
                      value={restaurantFormData.closingTime}
                      onChange={handleRestaurantChange}
                      className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                </div>

                <div className="w-full space-y-1.5 md:col-span-3">
                  <label className="text-sm font-semibold text-(--color-base-content)">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={restaurantFormData.description}
                    onChange={handleRestaurantChange}
                    rows={3}
                    placeholder="Tell your customers a little bit about your restaurant..."
                    className={`${inputBaseClass} resize-none ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                    disabled={!editingRestaurant}
                  />
                </div>
              </div>

              <div className="bg-(--color-base-100) my-4 rounded-2xl shadow-sm border border-(--color-base-300) p-6">
                <div className="mb-5 border-b border-(--color-base-300) pb-3 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-(--color-primary)">
                    Legal Information
                  </h3>
                  {editingRestaurant && (
                    <span className="text-xs font-medium bg-(--color-info) text-(--color-info-content) px-2 py-1 rounded-md">
                      Currently Editing
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-base-content)">
                      Registered Legal Name
                    </label>
                    <input
                      type="text"
                      name="legalName"
                      value={restaurantFormData.legalName}
                      onChange={handleRestaurantChange}
                      className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                      disabled={!editingRestaurant}
                    />
                  </div>

                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-semibold text-(--color-base-content)">
                      Company Type
                    </label>
                    <input
                      type="text"
                      name="companyType"
                      value={restaurantFormData.companyType}
                      onChange={handleRestaurantChange}
                      placeholder="e.g. LLC, Sole Proprietorship"
                      className={`${inputBaseClass} ${editingRestaurant ? inputEnabledClass : inputDisabledClass}`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Information Card */}
          </div>
        )}
      </div>

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantInformation;
