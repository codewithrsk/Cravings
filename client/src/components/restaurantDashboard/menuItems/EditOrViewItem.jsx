import React from "react";

const EditOrViewItem = ({ isOpen, onClose, item = {}, onSave }) => {
  const [formData, setFormData] = React.useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    foodType: "",
    status: "available",
    isTopRated: false,
    isRecommended: false,
    isNew: false,
    isDeleted: false,
  });

  const [previewImage, setPreviewImage] = React.useState(null);
  const [itemImageFile, setItemImageFile] = React.useState(null);

  const itemCategories = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Soup",
  "Side Dish",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Pizza",
  "Pasta",
  "Burger",
  "Sandwich",
  "Seafood",
  "Rice",
  "Wrap",
  "Starter",
  "Drink",
  "Other",
];

const foodTypes = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Egg-Free",
  "Other",
];

  React.useEffect(() => {
    if (isOpen && item) {
      setFormData((prev) => ({
        ...prev,
        itemName: item.itemName || "",
        description: item.description || "",
        price: item.price || "",
        category: item.category || "",
        foodType: item.foodType || "",
        status: item.status || "available",
        isTopRated: !!item.isTopRated,
        isRecommended: !!item.isRecommended,
        isNew: !!item.isNew,
        isDeleted: !!item.isDeleted,
      }));

      if (item.image && item.image.url) setPreviewImage(item.image.url);
      else setPreviewImage(null);
      setItemImageFile(null);
    }
  }, [isOpen, item]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setItemImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (typeof onSave === "function") {
      // allow parent to handle FormData or plain object
      const payload = new FormData();
      payload.append("itemName", formData.itemName);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("foodType", formData.foodType);
      payload.append("status", formData.status);
      payload.append("isTopRated", formData.isTopRated);
      payload.append("isRecommended", formData.isRecommended);
      payload.append("isNew", formData.isNew);
      payload.append("isDeleted", formData.isDeleted);
      if (itemImageFile) payload.append("itemImage", itemImageFile);

      try {
        await onSave(item._id || item.id, payload);
      } catch (err) {
        console.error("Save handler error", err);
      }
    } else {
      console.log("Edited item data:", formData, itemImageFile);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
        <header className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">View / Edit Item</h2>
          <button className="text-red-400 hover:text-red-600" onClick={onClose}>
            Close
          </button>
        </header>

        <main>
          <form className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 m-auto">
                <label
                  htmlFor="editItemImage"
                  className="relative group w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-inner border-4 border-(--color-base-200) bg-(--color-base-300) cursor-pointer">
                  {previewImage ? (
                    <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No Image</div>
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <span className="mb-1">Change Photo</span>
                  </div>

                  <input id="editItemImage" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              <div className="space-y-4 col-span-3">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="itemName">Item Name</label>
                  <input id="itemName" name="itemName" value={formData.itemName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block mb-1 font-medium" htmlFor="price">Price</label>
                  <input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="category">Category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                      <option value="">Select Category</option>
                      {itemCategories.map((cat, idx) => (
                        <option key={idx} value={cat} className="capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="foodType">Food Type</label>
                    <select id="foodType" name="foodType" value={formData.foodType} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                      <option value="">Select Food Type</option>
                      {foodTypes.map((ft, idx) => (
                        <option key={idx} value={ft} className="capitalize">
                          {ft}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-4">
                <label className="block mb-1 font-medium" htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>
          </form>
        </main>

        <footer className="flex justify-end border-t pt-2 mt-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
          <button className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </footer>
      </div>
    </div>
  );
};

export default EditOrViewItem;