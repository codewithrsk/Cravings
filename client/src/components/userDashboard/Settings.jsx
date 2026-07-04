import React from "react";
import { MdModeEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import api from "../../config/api.config";
import toast from "react-hot-toast";

const Settings = () => {
  const { user } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handlsave = async () => {
    setIsEditable(false);

    const payload = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };
    try {
      const res = await api.put("/user/edit-profile", payload);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + "|" + error.response?.data?.message ||
          error.message,
      );
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;

    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-(--background) h-fit m-5 border rounded-2xl border-transparent p-3">
        <div className="flex items-center justify-between p-3 text-2xl">
          <span>Profile Information</span>
          {isEditable === false ? (
            <>
              <button
                className="bg-(--secondary) text-(--primary-text)  border rounded-xl px-4 flex items-center gap-2 p-1 text-sm"
                onClick={() => setIsEditable(true)}
              >
                <MdModeEdit />
                Edit
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-35 w-35 rounded-full overflow-hidden ">
            <img
              src={user.photo.url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          {isEditable === false ? (
            <>
              <div className=" py-4 w-fit h-fit flex-col gap-y-6 space-y-4">
                <div className="flex items-center gap-3 ">
                  <span className="font-light ">Name</span>
                  <span className="font-medium">{user.fullName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-light">Email</span>
                  <span className="font-medium">{tempUser.email}</span>
                </div>
                <div className="flex gap-3 items-center ">
                  <span className="font-light">Phone</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" py-4 w-full h-fit flex-col gap-y-6 space-y-4">
                <div className="flex items-center gap-3 ">
                  <span className="font-light ">Name</span>
                  <span className="font-medium">
                    <input
                      type="text"
                      name="fullName"
                      value={tempUser.fullName}
                      className="border "
                      onChange={handlechange}
                    />
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-light">Email</span> 
                  <span className="font-medium">
                    <input
                      type="email"
                      className="border disabled:cursor-not-allowed"
                      name="email"
                      id=""
                      value={tempUser.email}
                      disabled
                    />
                  </span>
                </div>
                <div className="flex gap-3 items-center ">
                  <span className="font-light">Phone</span>
                  <span className="font-medium">
                    <input
                      type="tel"
                      value={tempUser.phone}
                      name="phone"
                      id=""
                      className="border"
                      onChange={handlechange}
                    />
                  </span>
                </div>
                <div className="flex gap-4 justify-end items-center">
                  <button
                    className="bg-(--secondary) text-(--primary-text)  border rounded-xl px-4"
                    onClick={() => setIsEditable(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="bg-(--secondary) text-(--primary-text)  border rounded-xl px-4"
                    onClick={handlsave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
          ;
        </div>
      </div>
    </>
  );
};

export default Settings;
