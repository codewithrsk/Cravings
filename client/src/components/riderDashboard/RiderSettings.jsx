import React, { useState, useEffect } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdEdit, MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import { IoMdHammer } from "react-icons/io";
import RidervehicleDetails from "./settings/RidervehicleDetails";
import RiderCurrentAddress from "./settings/RiderCurrentAddress";
import RiderPersonalInfo from "./settings/RiderPresnalInformation.jsx";

const RiderSetting = () => {
  const { user, setUser } = useAuth();
  const Tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "vehicle", label: "Vehicle" },
    { id: "address", label: "Address" },
  ];
  const [activeTab, setActiveTab] = useState("profile");

  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRider, setIsLoadingRider] = useState(false);
  const [isRiderAvailable, setIsRiderAvailable] = useState(false);
  const [riderData, setRiderData] = useState(null);

  const getInitialFormData = (currentUser = user) => {
    const rider = currentUser?.riderDetails || currentUser?.rider || {};
    const vehicleDetails = rider.vehicleDetails || {};
    const documents = rider.documents || {};
    const currentAddress = rider.currentAddress || {};

    return {
      fullName: currentUser?.fullName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      dateOfBirth: rider.dateOfBirth || "",
      gender: rider.gender || "",
      nationality: rider.nationality || "",
      emergencyContactName: rider.emergencyContactName || "",
      emergencyContactPhone: rider.emergencyContactPhone || "",
      vehicleType: vehicleDetails.vehicleType || "",
      vehicleNumber: vehicleDetails.vehicleNumber || "",
      vehicleModel: vehicleDetails.vehicleModel || "",
      vehicleColor: vehicleDetails.vehicleColor || "",
      drivingLicense: documents.drivingLicense || "",
      insuranceCertificate: documents.insuranceCertificate || "",
      aadharCard: documents.aadharCard || "",
      panCard: documents.panCard || "",
      address: currentAddress.address || "",
      city: currentAddress.city || "",
      state: currentAddress.state || "",
      pinCode: currentAddress.pinCode || "",
      country: currentAddress.country || "",
    };
  };

  const [formData, setFormData] = useState(() => getInitialFormData(user));

  const fetchRiderData = async () => {
    try {
      setIsLoadingRider(true);
      const res = await api.get(`/rider/profile`);
      const riderUser = res.data.data;
      setRiderData(riderUser);
      setUser(riderUser);
      sessionStorage.setItem("cravingRider", JSON.stringify(riderUser));
      sessionStorage.setItem(
        "RiderAvailable",
        String(riderUser.riderDetails?.isAvailable ?? false),
      );
      setIsRiderAvailable(riderUser.riderDetails?.isAvailable ?? false);
      setFormData(getInitialFormData(riderUser));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load rider details.",
      );
    } finally {
      setIsLoadingRider(false);
    }
  };

  const handleRiderAvailability = async () => {
    const nextAvailability = !isRiderAvailable;

    try {
      const res = await api.patch(`/rider/availability/${nextAvailability}`);
      const updatedRider = res.data.data;
      const availability =
        updatedRider?.riderDetails?.isAvailable ?? nextAvailability;

      setIsRiderAvailable(availability);
      setRiderData(updatedRider);
      setUser(updatedRider);
      sessionStorage.setItem("cravingRider", JSON.stringify(updatedRider));
      sessionStorage.setItem("RiderAvailable", String(availability));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update availability.",
      );
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRiderData();
    }
  }, [user?._id]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);
      payload.append("dateOfBirth", formData.dateOfBirth || "");
      payload.append("gender", formData.gender || "");
      payload.append("nationality", formData.nationality || "");
      payload.append(
        "emergencyContactName",
        formData.emergencyContactName || "",
      );
      payload.append(
        "emergencyContactPhone",
        formData.emergencyContactPhone || "",
      );
      payload.append("vehicleType", formData.vehicleType || "");
      payload.append("vehicleNumber", formData.vehicleNumber || "");
      payload.append("vehicleModel", formData.vehicleModel || "");
      payload.append("vehicleColor", formData.vehicleColor || "");
      payload.append("drivingLicense", formData.drivingLicense || "");
      payload.append(
        "insuranceCertificate",
        formData.insuranceCertificate || "",
      );
      payload.append("aadharCard", formData.aadharCard || "");
      payload.append("panCard", formData.panCard || "");
      payload.append("address", formData.address || "");
      payload.append("city", formData.city || "");
      payload.append("state", formData.state || "");
      payload.append("pinCode", formData.pinCode || "");
      payload.append("country", formData.country || "");

      if (profilePic) {
        payload.append("displayPic", profilePic);
      }

      const response = await api.put(`/rider/profile`, payload);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      sessionStorage.setItem("cravingUser", JSON.stringify(updatedUser));
      sessionStorage.setItem("cravingRider", JSON.stringify(updatedUser));
      setRiderData(updatedUser);
      setFormData(getInitialFormData(updatedUser));
      setEditingProfile(false);
      setProfilePic(null);
      setProfilePicPreview(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData(getInitialFormData(riderData || user));
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

  return (
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
                    {riderData?.fullName || user?.fullName || "Rider settings"}
                  </h1>
                  <p className="text-sm text-(--color-secondary) max-w-2xl">
                    Manage rider information, vehicle details, and current
                    address from one dashboard.
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
                        isRiderAvailable
                          ? "bg-(--color-primary)"
                          : "bg-gray-300"
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
              {Tabs.map((tab) => (
                <button
                  key={tab.id}
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
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "vehicle" && <VehicleDetails />}
            {activeTab === "address" && <CurrentAddress />}
          </div>
        </>
      )}
    </div>
  );
};

export default RiderSetting;
