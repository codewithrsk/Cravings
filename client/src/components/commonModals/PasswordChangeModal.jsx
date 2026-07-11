import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const PasswordChangeModal = ({ open, onClose }) => {

  const [showPassword, setShowPassword] = React.useState(false);
 const handleChangePassword = () => {
    // Implement password change logic here
    onClose(); // Close the modal after changing the password
  } 

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-999 flex justify-center items-center ">
        <div className="bg-white w-xl rounded shadow max-h-[80vh] overflow-y-auto relative">
          <header className="flex justify-between p-4 border-b border-gray-200">
            <div className="text-lg font-semibold text-gray-900">Change Password</div>
            < button className="text-gray-500 hover:text-gray-700"
            onClick={()=>{onClose()}}  >
              <IoMdCloseCircle />
            </button>
          </header>
          <main className="p-4">
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="text"
                id="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
            </div>
          </main>
          <footer className="p-4 bg-gray-100 flex justify-end">
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 mr-2"
            onClick={handleChangePassword}
            >
              Cancel
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Change Password
            </button>
            </footer>
        </div>
      </div>
    </>
  );
};

export default PasswordChangeModal;
