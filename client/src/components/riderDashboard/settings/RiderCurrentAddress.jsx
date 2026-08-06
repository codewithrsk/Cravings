import React from "react";

const RiderCurrentAddress = ({ formData, handleProfileChange, editingProfile }) => {
  const inputClassName = (isDisabled) =>
    `w-full rounded border px-3 py-2 ${
      isDisabled ? "border-transparent bg-transparent" : "border-(--color-secondary)"
    }`;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">City</label>
        <input
          type="text"
          name="city"
          value={formData.city || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">State</label>
        <input
          type="text"
          name="state"
          value={formData.state || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Pin Code</label>
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>
    </div>
  );
};

export default RiderCurrentAddress;
