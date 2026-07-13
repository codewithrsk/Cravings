import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiListHeartLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";

const MenuItems = [
  { name: "Overview", icon: <MdOutlineDashboard /> },
  { name: "All Users", icon: <FaUsers /> },
  { name: "WishList", icon: <PiListHeartLight /> },
  { name: "Settings", icon: <BsPersonGear /> },
];

const AdminSidebar = ({ active, setActive }) => {

  return (
    <>
    <div className="h-[92vh] flex">
      <div className="p-3">
        <div className="border-b-2 text-center text-xl">Admin Dashboard</div>

        <div className="space-y-1 p-4 mt-4">
          {MenuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex gap-3 font-semibold items-center border border-transparent hover:border-(--color-primary) active:bg-(--color-primary) w-full p-3 rounded-lg ${active === item.name && "bg-(--color-primary) text-(--color-primary-content)"}`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminSidebar;
