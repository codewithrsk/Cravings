import React, { useEffect, useState } from "react";
import { FaAward, FaRegGrinStars } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { LuPencilLine, LuTrash2, LuEye, LuChevronDown } from "react-icons/lu";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import ConfirmModal from "./menuItems/ConfirmModal";
import AddNewItemModal from "./menuItems/AddNewItemModal";
import EditOrViewItem from "./menuItems/EditOrViewItem";
import api from "../../config/api.config";
import { useAuth } from "../../context/AuthContext";
import RunningLoader from "../../assets/runningLoader.gif";

const statusChipStyles = {
  available: "bg-green-100 text-green-700 border border-green-300",
  unavailable: "bg-amber-100 text-amber-700 border border-amber-300",
  discontinued: "bg-rose-100 text-rose-700 border border-rose-300",
};

const statusLabels = {
  available: "Available",
  unavailable: "Unavailable",
  discontinued: "Discontinued",
};

const Restaurantmenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false);
  const [isEditViewItemModalOpen, setIsEditViewItemModalOpen] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const menu = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/restaurant/menu-items", {
        params: { t: Date.now() },
      });
      setMenuItems(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    menu();
  }, [isAddNewItemModalOpen, isEditViewItemModalOpen, isControlsModalOpen ]);

  const handleUpdateMenuItem = async (menuItemId, payload) => {
    try {
      const config =
        payload instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const { data } = await api.put(
        `/restaurant/menu-item/${menuItemId}`,
        payload,
        config,
      );

      toast.success(data.message || "Menu item updated successfully");

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item._id === menuItemId || item.id === menuItemId ? data.data : item,
        ),
      );

      return data.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update menu item. Please try again.",
      );
      throw error;
    }
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    try {
      const { data } = await api.delete(
        `/restaurant/delete-menu-item/${menuItemId}`,
      );

      toast.success(data.message || "Menu item deleted successfully");

      setMenuItems((prevItems) =>
        prevItems.filter(
          (item) => item._id !== menuItemId && item.id !== menuItemId,
        ),
      );

      return data.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete menu item. Please try again.",
      );
      throw error;
    }
  };

  const handleConfirmControlAction = async () => {
    if (!selectedItem) return;

    try {
      if (modalMode === "delete") {
        await handleDeleteMenuItem(selectedItem._id || selectedItem.id);
      } else {
        const payload = {};
        if (modalMode === "topRated") {
          payload.isTopRated = !selectedItem.isTopRated;
        } else if (modalMode === "recommended") {
          payload.isRecommended = !selectedItem.isRecommended;
        } else if (modalMode === "new") {
          payload.isNew = !selectedItem.isNew;
        }

        await handleUpdateMenuItem(
          selectedItem._id || selectedItem.id,
          payload,
        );
      }

      setIsControlsModalOpen(false);
    } catch (error) {
      console.error("Control action failed", error);
    }
  };

  return (
    <>
      {/* {isLoding && (
        <>
          <div className="bg-amber-500 h-50 w-100">
            <loding />
          </div>
        </>
      )} */}

      <div className="overflow-y-auto h-full p-3">
        {isLoading ? (
          <>
            <div className="bg-gray-50 h-full flex justify-center items-center">
              <div className="h-100 w-100">
                <img src={RunningLoader} alt="Loading..." className="w-full h-full mb-0 pb-0" />
                <div className="flex justify-center">Loading...</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center px-1">
              <h2 className="text-2xl font-bold mb-6">Menu Management</h2>
              <div className="flex gap-4 items-center">
                <button
                  className="hover:bg-(--color-primary) border border-(--color-primary) text-(--color-primary) hover:text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                  onClick={() => setIsAddNewItemModalOpen(true)}
                >
                  <IoMdAddCircleOutline />
                  Add New Item
                </button>
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search menu..."
                  className="border border-(--color-primary) rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-colors"
                />
              </div>
            </div>

            <div className="bg-(--color-base-200) p-4 rounded-lg">
              <div className="text-(--color-primary) grid grid-cols-7 gap-4 font-bold border-b border-(--color-secondary) py-2">
                <div className="col-span-2">Item Name & Description</div>
                <div className="text-center">Price</div>
                <div>Category & Type</div>
                <div>Status</div>
                <div>Controls</div>
                <div>Actions</div>
              </div>
              <div className="overflow-y-auto max-h-[65vh]">
                {menuItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-7 gap-4 border-b border-(--color-secondary) py-2 items-center"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <img
                          src={item.image?.url || ""}
                          alt={item.itemName}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="w-full">
                        <div>{item.itemName}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">{typeof item.price === 'number' ? `₹ ${item.price.toFixed(2)}` : "-"}</div>
                    <div className="">
                      <div>{item.category}</div>
                      <div className="text-sm">
                        {item.foodType || item.type || "-"}
                      </div>
                    </div>
                    <div>
                      <div className="relative inline-flex items-center">
                        <select
                          value={item.status}
                          className={`appearance-none rounded-md pl-3 pr-8 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                            statusChipStyles[item.status]
                          }`}
                          onChange={async (e) => {
                            const updatedStatus = e.target.value;
                            try {
                              await handleUpdateMenuItem(item._id || item.id, {
                                status: updatedStatus,
                              });
                            } catch (error) {
                              console.error("Status update failed", error);
                            }
                          }}
                        >
                          <option value="available">
                            {statusLabels.available}
                          </option>
                          <option value="unavailable">
                            {statusLabels.unavailable}
                          </option>
                          <option value="discontinued">
                            {statusLabels.discontinued}
                          </option>
                        </select>
                        <LuChevronDown className="pointer-events-none absolute right-2 text-xs opacity-70" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`rounded flex items-center justify-center ${
                          item.isTopRated
                            ? " text-(--color-primary)"
                            : "text-(--color-secondary)"
                        }`}
                        title={
                          item.isTopRated ? "Top Rated" : "Mark as Top Rated"
                        }
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("topRated");
                          setIsControlsModalOpen(true);
                        }}
                      >
                        <FaAward className="" />
                      </button>
                      <button
                        className={`rounded flex items-center justify-center ${
                          item.isRecommended
                            ? "text-(--color-primary)"
                            : "text-(--color-secondary)"
                        }`}
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("recommended");
                          setIsControlsModalOpen(true);
                        }}
                        title={
                          item.isRecommended
                            ? "Recommended"
                            : "Mark as Recommended"
                        }
                      >
                        <AiTwotoneLike className="" />
                      </button>
                      <button
                        className={`px-1 py-0.5 rounded flex items-center justify-center text-xs ${
                          item.isNew
                            ? "text-(--color-primary) border border-(--color-primary)"
                            : "text-(--color-secondary) border border-(--color-secondary)"
                        }`}
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("new");
                          setIsControlsModalOpen(true);
                        }}
                        title={item.isNew ? "New Item" : "Mark as New"}
                      >
                        New
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                        title="Edit Item"
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("edit");
                          setIsEditViewItemModalOpen(true);
                        }}
                      >
                        <LuPencilLine />
                      </button>
                      <button
                        className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                        title="View Item Details"
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("view");
                          setIsEditViewItemModalOpen(true);
                        }}
                      >
                        <LuEye />
                      </button>
                      <button
                        className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                        title="Delete Item"
                        onClick={() => {
                          setSelectedItem(item);
                          setModalMode("delete");
                          setIsControlsModalOpen(true);
                        }}
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {isControlsModalOpen && (
        <ConfirmModal
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isControlsModalOpen}
          onClose={() => setIsControlsModalOpen(false)}
          onConfirm={handleConfirmControlAction}
        />
      )}
      {isAddNewItemModalOpen && (
        <>
          <AddNewItemModal
            isOpen={isAddNewItemModalOpen}
            onClose={() => setIsAddNewItemModalOpen(false)}
          />
        </>
      )}
      {isEditViewItemModalOpen && (
        <>
          <EditOrViewItem
            isOpen={isEditViewItemModalOpen}
            onClose={() => setIsEditViewItemModalOpen(false)}
            item={selectedItem}
            mode={modalMode}
            onSave={handleUpdateMenuItem}
          />
        </>
      )}
    </>
  );
};

export default Restaurantmenu;
