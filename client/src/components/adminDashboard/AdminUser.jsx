import React, { useState } from "react";
import api from "../../config/api.config";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AdminUser = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Simulate fetching user data from an API
        // const response = await api.get('/admin/users');
        // const users = response.data;
        const response = await api.get("/admin/users");
        setUsers(response.data.data);
        console.log("user", users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="bg-amber-50 w-fit m-7 text-2xl underline p-3">
        Admin Users
      </div>
      {showUsers === false && (
        <>
          <div className="grid grid-cols-2 gap-4 m-7">
            <div className="bg-amber-100 p-4 rounded-lg shadow-md">
              <div className="text-xl font-semibold mb-2">Total Users</div>
              <p className="text-gray-700">{users.length}</p>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg shadow-md">
              <div className="text-xl font-semibold mb-2">Active Users</div>
              <p className="text-gray-700">30</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 m-7">
            <div className="bg-amber-100 p-4 rounded-lg shadow-md">
              <div className="text-xl font-semibold mb-2">Inactive Users</div>
              <p className="text-gray-700">20</p>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg shadow-md">
              <div className="text-xl font-semibold mb-2">Total Admins</div>
              <p className="text-gray-700">5</p>
            </div>
          </div>
        </>
      )}
      {!showUsers && (
        <button
          className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md m-7"
          onClick={getUsers}
        >
          Show Users
        </button>
      )}
      {showUsers && (
        <div className="flex justify-between bg-amber-100 p-4 rounded-lg shadow-md m-7">
          <div className="text-xl font-semibold mb-2">User List</div>
          <div className="text-2xl">
            <button
              className="text-red-400 hover:text-red-700"
              onClick={() => setShowUsers(false)}
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
        </div>
      )}
      {showUsers && (
        <ol className="">
          {users.map((user, index) => (
            <li key={index} className="mb-2">
              <div className="flex bg-amber-100 p-4 rounded-lg shadow-md m-7 text-gray-700 items-center">
                <div className="w-20 h-20">
                  <img
                    src={user.photo.url}
                    alt=""
                    className="w-fit h-fit rounded-full"
                  />
                </div>
                <div className="flex-col ml-4 gap-1">
                  <div className="font-semibold">Name: {user.fullName}</div>
                  <div className="font-semibold">Email: {user.email}</div>
                  <div className="font-semibold">Phone: {user.phone}</div>
                  <div className="font-semibold">Status: Active </div>
                  <div className="font-semibold">
                    Created At: {new Date(user.createdAt).toLocaleString()}
                  </div>
                  <div className="font-semibold">Role: {user.userType}</div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
};

export default AdminUser;
