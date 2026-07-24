import React, { useState } from "react";

const AddNewItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Main Course",
    foodType: "Veg",
    status: true,
    image: null,
    imagePreview: null,
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddItem({
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      price: `$${formData.price}`,
      category: formData.category,
      foodType: formData.foodType,
      status: formData.status ? "available" : "not_available",
      image:
        formData.imagePreview ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    });

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Main Course",
      foodType: "Veg",
      status: true,
      image: null,
      imagePreview: null,
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Main Course",
      foodType: "Veg",
      status: true,
      image: null,
      imagePreview: null,
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] bg-orange-50">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 border-orange-200 bg-orange-50">
          <div>
            <h2 className="text-2xl font-bold text-orange-950">
              Add New Menu Item
            </h2>
            <p className="text-sm mt-1 text-gray-600">
              Fill in the details to create a new menu item.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:opacity-70 transition text-2xl font-bold leading-none text-orange-950"
          >
            ✕
          </button>
        </div>

        {/* Body - Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-2">
          {/* Item Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-orange-950">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex. Paneer Butter Masala"
              className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 bg-orange-50 text-orange-950 ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-orange-200 focus:ring-orange-200"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-orange-950">
              Description *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a delicious description..."
              className={`w-full resize-none rounded-lg border px-4 py-2 outline-none transition focus:ring-2 bg-orange-50 text-orange-950 ${
                errors.description
                  ? "border-red-500 focus:ring-red-200"
                  : "border-orange-200 focus:ring-orange-200"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-orange-950">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="299"
                step="0.01"
                className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 bg-orange-50 text-orange-950 ${
                  errors.price
                    ? "border-red-500 focus:ring-red-200"
                    : "border-orange-200 focus:ring-orange-200"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-orange-950">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-2 outline-none transition focus:ring-2 focus:ring-orange-200 bg-orange-50 text-orange-950"
              >
                <option>Main Course</option>
                <option>Appetizer</option>
                <option>Dessert</option>
                <option>Beverage</option>
              </select>
            </div>
          </div>

          {/* Type + Status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-orange-950">
                Food Type
              </label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-orange-200 px-4 py-2 outline-none transition focus:ring-2 focus:ring-orange-200 bg-orange-50 text-orange-950"
              >
                <option>Veg </option>
                <option>Non-Veg </option>
                <option>Egg </option>
                <option>Jain</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-orange-950">
                Status
              </label>
              <div className="flex h-10 items-center justify-between rounded-lg border border-orange-200 px-4 bg-orange-100">
                <span className="text-sm font-medium text-orange-950">
                  {formData.status ? "Available" : "Not Available"}
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleStatusToggle}
                    className="sr-only peer"
                  />
                  <div
                    className={`peer h-5 w-9 rounded-full transition after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all ${
                      formData.status
                        ? "bg-green-500 after:translate-x-4"
                        : "bg-orange-200"
                    }`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-orange-950">
              Item Image
            </label>
            {formData.imagePreview ? (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      imagePreview: null,
                    }))
                  }
                  className="absolute top-2 right-2 p-1 rounded-lg transition font-bold text-lg leading-none text-white bg-red-600 hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-orange-200 p-6 transition hover:bg-opacity-50 bg-orange-100">
                <div className="text-3xl mb-2 text-(--color-primary)">
                  📤
                </div>
                <p className="font-medium text-orange-950">
                  Click to upload
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  PNG, JPG or WEBP
                </p>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4 border-orange-200 bg-orange-100">
          <button
            onClick={handleClose}
            className="rounded-lg border border-orange-200 px-4 py-2 font-medium transition hover:opacity-70 text-orange-950"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg px-4 py-2 font-semibold text-white transition hover:opacity-90 bg-orange-700 hover:bg-orange-800"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewItemModal;