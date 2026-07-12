import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";

const RestaurantSettings = () => {
  const { user, setUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);

      payload.append("displayPic", profilePic);

      const response = await api.put(`/user/edit-profile`, payload);

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
    setFormData({
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
    <div className="overflow-y-auto h-full p-6 space-y-6">
      {/* User Profile Section */}
      <div className="bg-(--color-base-200) rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
            >
              <MdEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelProfile}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-36 h-36">
                <img
                  src={profilePicPreview || user.photo.url}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
                />
              </div>

              {editingProfile && (
                <div
                  className="absolute cursor-pointer bottom-1 right-1 border p-2 rounded-full w-fit bg-(--color-base-200)"
                  title="Change Photo"
                >
                  <label htmlFor="profilePic" className="cursor-pointer">
                    <MdOutlineAddAPhoto className="text-xl" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    id="profilePic"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 w-full">
              <div className="grid grid-cols-5 gap-2 justify-center items-center">
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleProfileChange}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                  disabled={!editingProfile}
                />

                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary) text-(--color-secondary) disabled:bg-(--color-secondary)/20 cursor-not-allowed font-extrabold" : "border-transparent"} rounded col-span-4 `}
                  disabled
                />

                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                  disabled={!editingProfile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-full bg-(--color-base-200) rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl mb-4 font-semibold">
              Add Restaurant Details
            </h3>
          </div>
          <h3 className="text-md font-medium my-4">
            Complete Address of your restaurant:
          </h3>
          <div className="flex-col gap-4 ">
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantname"
                className="block text-sm font-semibold mb-2 "
              >
                Restaurant Name
              </label>

              <input
                type="text"
                name="restaurantname"
                id="restaurantname"
                placeholder="Restaurant Name"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantAddress"
                className="block text-sm font-semibold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                name="restaurantAddress"
                id="restaurantAddress"
                placeholder="Restaurant Address"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantDescription"
                className="block text-sm font-semibold mb-2"
              >
                City
              </label>
              <input
                type="text"
                name="restaurantCity"
                id="restaurantCity"
                placeholder="City"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantState"
                className="block text-sm font-semibold mb-2"
              >
                State
              </label>
              <input
                type="text"
                name="restaurantState"
                id="restaurantState"
                placeholder="State"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantZip"
                className="block text-sm font-semibold mb-2"
              >
                Pin Code
              </label>
              <input
                type="text"
                name="restaurantZip"
                id="restaurantZip"
                placeholder="Pin Code"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantcountry"
                className="block text-sm font-semibold mb-2"
              >
                Country
              </label>
              <input
                type="text"
                name="restaurantcountry"
                id="restaurantcountry"
                placeholder="Country"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">
              Complete Documents of your restaurant:
            </h3>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantlegalname"
                className="block text-sm font-semibold mb-2"
              >
                Legal Name
              </label>
              <input
                type="text"
                name="restaurantlegalname"
                id="restaurantlegalname"
                placeholder="Legal Name"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantcompanyname"
                className="block text-sm font-semibold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="restaurantcompanyname"
                id="restaurantcompanyname"
                placeholder="Company Name"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantgstcertificate"
                className="block text-sm font-semibold mb-2"
              >
                GST Certificate
              </label>
              <input
                type="text"
                name="restaurantgstcertificate"
                id="restaurantgstcertificate"
                placeholder="GST Certificate"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantfssailicense"
                className="block text-sm font-semibold mb-2"
              >
                FSSAI License
              </label>
              <input
                type="text"
                name="restaurantfssailicense"
                id="restaurantfssailicense"
                placeholder="FSSAI License"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>

            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantpancard"
                className="block text-sm font-semibold mb-2"
              >
                PAN Card
              </label>
              <input
                type="text"
                name="restaurantpancard"
                id="restaurantpancard"
                placeholder="PAN Card"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">
              Complete Bank Details of your restaurant:
            </h3>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantbankname"
                className="block text-sm font-semibold mb-2"
              >
                Bank Name
              </label>
              <input
                type="text"
                name="restaurantbankname"
                id="restaurantbankname"
                placeholder="Bank Name"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantaccountnumber"
                className="block text-sm font-semibold mb-2"
              >
                Account Number
              </label>
              <input
                type="text"
                name="restaurantaccountnumber"
                id="restaurantaccountnumber"
                placeholder="Account Number"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantifsccode"
                className="block text-sm font-semibold mb-2"
              >
                IFSC Code
              </label>
              <input
                type="text"
                name="restaurantifsccode"
                id="restaurantifsccode"
                placeholder="IFSC Code"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">
              Complete Contact Details of your restaurant:
            </h3>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantcontactemail"
                className="block text-sm font-semibold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                name="restaurantcontactemail"
                id="restaurantcontactemail"
                placeholder="Contact Email"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantcontactphone"
                className="block text-sm font-semibold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                name="restaurantcontactphone"
                id="restaurantcontactphone"
                placeholder="Contact Phone"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">
              Complete Serving Hours of your restaurant:
            </h3>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantopeningtime"
                className="block text-sm font-semibold mb-2"
              >
                Opening Time
              </label>
              <input
                type="time"
                name="restaurantopeningtime"
                id="restaurantopeningtime"
                placeholder="Opening Time"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <label
                htmlFor="restaurantclosingtime"
                className="block text-sm font-semibold mb-2"
              >
                Closing Time
              </label>
              <input
                type="time"
                name="restaurantclosingtime"
                id="restaurantclosingtime"
                placeholder="Closing Time"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">
              Complete Social Media Links of your restaurant:
            </h3>
            <div className="grid grid-cols-8 gap-2 mt-4 justify-center items-center">
              <select
                name="socialMedia"
                id="socialMedia"
                className="border border-(--color-secondary) rounded px-3 py-2 "
              >
                <option value="">Select Platform</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>

              <input
                type="url"
                name="socialMediaLink"
                id="socialMediaLink"
                placeholder="Social Media Link"
                className={`w-full px-3 py-2 border border-(--color-secondary) rounded col-span-4`}
              />
            </div>
            <h3 className="text-md font-medium my-4">Restaurant Image:</h3>
            <div>
              <label htmlFor="coverPhoto">Cover Image</label>
              <input/>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-(--color-primary)/90 hover:bg-(--color-primary) hover:animate-pulse text-(--color-primary-content) font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettings;
