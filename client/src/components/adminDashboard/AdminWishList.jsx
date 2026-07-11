import React from "react";

const AdminWishList = () => {
  return (
    <>
      <div>WishList</div>
      <div className="bg-amber-50 w-fit m-7 text-2xl underline p-3">Admin WishList</div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md"> 
          <h2 className="text-xl font-semibold mb-2">Total WishList Items</h2>
          <p className="text-gray-700">200</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Most WishListed Product</h2>
          <p className="text-gray-700">Product B</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-7">
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Most Active User</h2>
          <p className="text-gray-700">User Y</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users with WishList</h2>
          <p className="text-gray-700">30</p>
        </div>
      </div>
    </>
  );
};

export default AdminWishList;
