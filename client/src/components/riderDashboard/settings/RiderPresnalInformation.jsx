import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import PasswordChangeModal from "../../commonModals/PasswordChangeModal.jsx";
import { MdEdit, MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
import api from "../../../config/api.config.js";
import toast from "react-hot-toast";

const PresonalInformation = () => {
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", profileFormData.fullName);
      payload.append("email", profileFormData.email.toLowerCase());
      payload.append("phone", profileFormData.phone);

      payload.append("displayPic", profilePic);

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
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  return (
    <>
      <div className="bg-(--color-base-100) rounded-2xl shadow-lg border border-(--color-base-300) overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-(--color-primary) to-orange-500 px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                Personal Information
              </h2>
              <p className="text-white/80 text-sm">
                Manage your profile information
              </p>
            </div>

            {!editingProfile ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-(--color-primary) font-medium hover:scale-105 transition-all"
                >
                  <MdEdit size={18} />
                  Edit
                </button>

                <button
                  onClick={() => setIsPasswordChangeModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white text-white hover:bg-white hover:text-(--color-primary) transition-all"
                >
                  <MdOutlineLockReset size={18} />
                  Password
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="px-5 py-2 rounded-xl bg-white text-(--color-primary) font-semibold hover:scale-105 transition"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={handleCancelProfile}
                  disabled={isLoading}
                  className="px-5 py-2 rounded-xl border border-white text-white hover:bg-white hover:text-(--color-primary)"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-orange-500 to-red-500">
                  <img
                    src={profilePicPreview || user.photo.url}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>

                {editingProfile && (
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-(--color-primary) text-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition"
                  >
                    <MdOutlineAddAPhoto size={20} />
                  </label>
                )}

                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {profileFormData.fullName}
              </h3>

              <p className="text-sm text-(--color-secondary)">
                {profileFormData.email}
              </p>
            </div>

            {/* Form */}
            <div className="flex-1">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-(--color-secondary)">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={profileFormData.fullName}
                    onChange={handleProfileChange}
                    disabled={!editingProfile}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 transition-all
              ${
                editingProfile
                  ? "bg-white border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)"
                  : "bg-(--color-base-200) border-(--color-base-300)"
              }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-(--color-secondary)">
                    Email
                  </label>

                  <input
                    type="email"
                    value={profileFormData.email}
                    disabled
                    className="mt-2 w-full rounded-xl border border-(--color-base-300) bg-(--color-base-200) px-4 py-3 cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-(--color-secondary)">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={profileFormData.phone}
                    onChange={handleProfileChange}
                    disabled={!editingProfile}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 transition-all
              ${
                editingProfile
                  ? "bg-white border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)"
                  : "bg-(--color-base-200) border-(--color-base-300)"
              }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default PresonalInformation;
