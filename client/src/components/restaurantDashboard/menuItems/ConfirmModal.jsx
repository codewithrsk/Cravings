import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ConfirmModal = ({
  selectedItem,
  modalMode,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className=" text-2xl flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2">
            <h1 className="text-(--color-primary)">Are your Sure ?</h1>

            <button
              className="text-red-300 hover:text-red-500"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
          <div>
            <h2 className="mb-6 text-lg font-semibold">
              {modalMode === "delete" && "Confirm Deletion"}
              {modalMode === "topRated" && "Confirm Top Rated Status Change"}
              {modalMode === "recommended" &&
                "Confirm Recommended Status Change"}
              {modalMode === "new" && "Confirm New Status Change"}
            </h2>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-(--color-primary)/90 text-white hover:bg-(--color-primary)"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
