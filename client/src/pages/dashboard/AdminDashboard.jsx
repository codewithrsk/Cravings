import React, { useState } from "react";
import AdminSidebar from "../../components/adminDashboard/AdminSidebar";
import AdminUser from "../../components/adminDashboard/AdminUser";
import AdminOverview from "../../components/adminDashboard/AdminOverview";
import AdminWishList from "../../components/adminDashboard/AdminWishList";
import AdminSettings from "../../components/adminDashboard/AdminSettings";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [active, setActive] = useState("Overview");
  const { user, isLogin, role } = useAuth();
  const navigate = useNavigate();

  if (!isLogin || role !== "admin") {
    return (
      <div className=" h-[9vh]">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-(--color-neutral-content)">
            Access Denied. Please log in as a Admin to view this page.
          </h1>
          <button
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[92vh]">
        <div className="w-1/6 border border-red-500 h-full shadow shadow-gray-500">
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        <div
          className="w-5/6 border border-green-500 h-full"
        >
          {active === "Overview" && <AdminOverview />}
          {active === "All Users" && <AdminUser />}
          {active === "WishList" && <AdminWishList />}
          {active === "Settings" && <AdminSettings />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
