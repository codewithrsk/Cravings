import React from "react";
import deliveryboy from "../assets/deliberyboy.png";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const datapacket = (e)=>{
  e.preventDefault();

    console.log(e.email);

    
}

const Register = () => {
  return (
    <>
      <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 ">
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
        <div className="w-[60%] h-[90%] bg-white rounded shadow  p-10 flex flex-col justify-center ml-12">
          <div className="flex justify-center text-4xl text-(--primary) mt-3 font-bold">
            Create Account
          </div>
          <span className="flex justify-center text-gray-500 mb-5">
            Join us as a Customer, Restaurant, or Rider
          </span>

          <form onSubmit={datapacket}>
            <label htmlFor="email" className="block font-medium  text-gray-700">
              Register as:
            </label>
            <div className="flex justify-between">
              <div className="flex  gap-2 ">
                <input
                  type="radio"
                  id="customer"
                  name="userType"
                  className="border p-2 rounded focus:outline-none "
                />
                <label htmlFor="email">Customer</label>
              </div>
              <div className="flex  gap-2 ">
                <input
                  type="radio"
                  id="restaurant"
                  name="userType"
                  className="border p-2 rounded focus:outline-none "
                />
                <label htmlFor="email">Restaurant</label>
              </div>
              <div className="flex  gap-2 ">
                <input
                  type="radio"
                  id="rider"
                  name="userType"
                  className="border p-2 rounded focus:outline-none "
                />
                <label htmlFor="email">Rider</label>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 font-medium">
              <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  autoComplete="name"
                  placeholder="Enter Your Name"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="flex  mt-4 font-medium  items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                autoComplete="email"
                placeholder="Enter Your Email"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            <div className="flex  mt-4 font-medium  items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                autoComplete="tel"
                placeholder="Enter Your Phone Number"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            <div className="flex  mt-4 font-medium  items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
              <input
                type="password"
                id="userPass"
                name="userPass"
                placeholder="Enter Your Password"
                className="flex-1 outline-none bg-transparent"
                autoComplete="new-password"
              />
            </div>
            <div className="flex  mt-4 font-medium  items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
              <input
                type="password"
                id="userConfPass"
                name="userConfPass"
                placeholder="Confirm Your Password"
                className="flex-1 outline-none bg-transparent"
                autoComplete="new-password webauthn"
              />
            </div>
            <div className=" flex gap-1 mt-3">
              <span className="flex gap-1">
                <input type="checkbox" />
                <label htmlFor="rember">I agree to the </label>
              </span>
              <Link
                to={"/register"}
                className="text-(--secondary) hover:underline hover:text-(--primary)"
              >
                terms and conditions.
              </Link>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent) "
            >
              Register
            </button>
          </form>
          <div className="relative mb-6 mt-4">
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Already registered?
              </span>
              <Link
                to={"/login"}
                className="text-(--primary) hover:underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
