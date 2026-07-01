import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("UserData")));
  }, []);

  return (
    <>
      <div className="h-100 w-100 rounded-2xl bg-amber-100 shadow-amber-300 m-4 p-4">
        <div>Welcome Back!! {userData.fullName}</div>
        <div>Welcome Back!! {userData.email}</div>
        <div>Welcome Back!! {userData.phone}</div>
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={userData.photo.url}
            alt="user photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
