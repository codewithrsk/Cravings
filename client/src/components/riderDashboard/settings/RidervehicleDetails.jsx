import React from "react";

const RidervehicleDetails = ({
  formData,
  handleProfileChange,
  editingProfile,
}) => {
  const inputClassName = (isDisabled) =>
    `w-full rounded border px-3 py-2 ${
      isDisabled
        ? "border-transparent bg-transparent"
        : "border-(--color-secondary)"
    }`;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-semibold">Vehicle Type</label>
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Vehicle Number
        </label>
        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Vehicle Model
        </label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Vehicle Color
        </label>
        <input
          type="text"
          name="vehicleColor"
          value={formData.vehicleColor || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Driving License
        </label>
        <input
          type="text"
          name="drivingLicense"
          value={formData.drivingLicense || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Insurance Certificate
        </label>
        <input
          type="text"
          name="insuranceCertificate"
          value={formData.insuranceCertificate || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Aadhar Card</label>
        <input
          type="text"
          name="aadharCard"
          value={formData.aadharCard || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">PAN Card</label>
        <input
          type="text"
          name="panCard"
          value={formData.panCard || ""}
          onChange={handleProfileChange}
          className={inputClassName(!editingProfile)}
          disabled={!editingProfile}
        />
      </div>
    </div>
  );
};

export default RidervehicleDetails;
