import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminOverview = () => {
 
  return (
    <>
      <div className="bg-amber-50 w-fit m-7 text-2xl underline p-3">
       Admin Overview
      </div>
      <div className="w-52 p-3 bg-amber-50 m-10">Total Amount</div>
    </>
  );
};

export default AdminOverview;
