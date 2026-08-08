import React from "react";
import {
  MdLocationOn,
  MdLocationCity,
  MdMap,
  MdPinDrop,
  MdPublic,
  MdEdit,
  MdSave,
  MdClose,
} from "react-icons/md";

const RiderCurrentAddress = ({
  formData,
  handleProfileChange,
  editingProfile,
  setEditingProfile,
  handleSaveAddress,
  handleCancelAddress,
  isLoading = false,
}) => {
  const inputClassName = (disabled) =>
    `w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none
    ${
      disabled
        ? "bg-(--color-base-200) border-(--color-base-300) text-(--color-base-content)/80 cursor-default"
        : "bg-white border-(--color-base-300) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
    }`;

  const InputField = ({
    label,
    name,
    value,
    icon,
    type = "text",
    fullWidth = false,
  }) => (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-(--color-base-content)">
        <span className="text-(--color-primary)">{icon}</span>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleProfileChange}
        disabled={!editingProfile}
        className={inputClassName(!editingProfile)}
      />
    </div>
  );

  return (
    <div className="rounded-2xl border border-(--color-base-300) bg-(--color-base-100) shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-(--color-base-300) bg-(--color-base-100) px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
            <MdLocationOn size={24} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-(--color-base-content)">
              Current Address
            </h2>
            <p className="text-sm text-(--color-secondary)">
              Manage your current residential address.
            </p>
          </div>
        </div>

        {!editingProfile ? (
          <button
            onClick={() => setEditingProfile(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-(--color-primary-content) transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <MdEdit size={18} />
            Edit Address
          </button>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSaveAddress}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-(--color-primary-content) transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MdSave size={18} />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleCancelAddress}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl border border-(--color-base-300) px-5 py-2.5 text-sm font-medium transition-all hover:bg-(--color-base-200)"
            >
              <MdClose size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            fullWidth
            label="Street Address"
            name="address"
            value={formData.address}
            icon={<MdLocationOn size={18} />}
          />

          <InputField
            label="City"
            name="city"
            value={formData.city}
            icon={<MdLocationCity size={18} />}
          />

          <InputField
            label="State"
            name="state"
            value={formData.state}
            icon={<MdMap size={18} />}
          />

          <InputField
            label="Pin Code"
            name="pinCode"
            value={formData.pinCode}
            icon={<MdPinDrop size={18} />}
          />

          <InputField
            label="Country"
            name="country"
            value={formData.country}
            icon={<MdPublic size={18} />}
          />
        </div>
      </div>
    </div>
  );
};

export default RiderCurrentAddress;
