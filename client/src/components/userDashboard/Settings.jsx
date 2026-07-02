import React from "react";
import { MdModeEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="bg-(--background) h-fit m-5 border rounded-2xl border-transparent p-3">
        <div className="flex items-center justify-between p-3 text-2xl">
          <span>Profile Information</span>
          <button className="bg-(--primary) text-(--primary-text)  border rounded-xl px-4 flex items-center gap-2 p-1 text-sm">
            <MdModeEdit />
            Edit
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-35 w-35 rounded-full overflow-hidden ">
            <img
              src={user.photo.url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className=" py-4 w-fit h-fit flex-col gap-y-6 space-y-4">
            <div className="flex items-center gap-3 ">
              <span className="font-light ">Name</span>
              <span className="font-medium">
                {user.fullName.toUpperCase()}{" "}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-light">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex gap-3 items-center ">
              <span className="font-light">Phone</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
