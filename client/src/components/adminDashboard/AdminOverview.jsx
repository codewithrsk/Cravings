import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminOverview = () => {
  return (
    <>
      <div className="bg-amber-50 w-fit m-7 text-2xl underline p-3">
        Admin Overview
      </div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-gray-700">100</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-700">50</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-gray-700">$5000</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
          <p className="text-gray-700">10</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Completed Orders</h2>
          <p className="text-gray-700">90</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Cancelled Orders</h2>
          <p className="text-gray-700">5</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Top Selling Product</h2>
          <p className="text-gray-700">Product A</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Most Active User</h2>
          <p className="text-gray-700">User X</p>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
