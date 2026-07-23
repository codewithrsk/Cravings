import React from "react";
import { MdOutlineDashboard, MdOutlineFastfood } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";

const MenuItems = [
  { name: "Overview", icon: <MdOutlineDashboard size={22} /> },
  { name: "Orders", icon: <MdOutlineFastfood size={22} /> },
  { name: "Menu", icon: <PiListHeartLight size={22} /> },
  { name: "Settings", icon: <BsPersonGear size={22} /> },
];

const RestaurantSidebar = ({ active, setActive }) => {
  const { user } = useAuth();

  return (
    <aside className="h-full w-full md:w-64 lg:w-72 bg-(--color-base-100) border-r border-(--color-base-300) flex flex-col shadow-sm">
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center justify-center border-b border-(--color-base-300) bg-(--color-base-200)/30">
        <div className="relative mb-4">
          <img
            src={user?.photo?.url || "/default-avatar.png"}
            alt={user?.fullName || "User"}
            className="w-24 h-24 rounded-full object-cover object-top border-4 border-(--color-base-100) hover:shadow-2xl"
          />
          {/* Subtle online status indicator */}
          <span
            className="absolute bottom-1 right-1 w-4 h-4 bg-(--color-success) border-2 border-(--color-base-100) rounded-full"
            title="Online"
          ></span>
        </div>

        <h2 className="text-lg font-bold text-(--color-base-content) text-center truncate w-full">
          {user?.fullName || "Restaurant Admin"}
        </h2>
        <span className="mt-1.5 px-3 py-1 text-xs font-bold tracking-wide bg-(--color-primary)/10 text-(--color-primary) rounded-full uppercase">
          {user?.userType || "Owner"}
        </span>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1.5">
        {MenuItems.map((item, idx) => {
          const isActive = active === item.name;

          return (
            <button
              key={idx}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${
                  isActive
                    ? "bg-(--color-primary) text-(--color-primary-content) shadow-md shadow-(--color-primary)/20"
                    : "text-(--color-secondary) hover:bg-(--color-base-200) hover:text-(--color-primary)"
                }`}
            >
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-(--color-primary-content)"
                    : "text-(--color-secondary) group-hover:text-(--color-primary)"
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default RestaurantSidebar;
