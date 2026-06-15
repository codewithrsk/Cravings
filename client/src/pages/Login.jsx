import React, { useState } from "react";
import deliveryboy from "../assets/deliberyboy.png";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("Login data submitted:", loginData);

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };
  };

  const isshowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <>
      <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10 ">
        <div className="w-[60%] h-[80%] bg-white rounded shadow  p-10 flex flex-col justify-center ml-12">
          <div className="flex justify-center text-4xl text-(--primary) mt-3">
            Welcome Back
          </div>
          <span className="flex justify-center text-gray-500 mb-5">
            Login to your Cravings account
          </span>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g example@gmail.com"
                value={loginData.email}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4 font-medium">
              <label htmlFor="password">Password</label>

              <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-(--accent)">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                />

                <button
                  type="button"
                  className="ml-2 text-gray-500 cursor-pointer"
                  onClick={isshowPassword}
                >
                  {/* <BsEye onClick={isshowPassword} /> */}
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>
            <div className=" flex justify-between">
              <span>
                <input type="checkbox" />
                <label htmlFor="rember">Remember me</label>
              </span>
              <Link to={"/register"} className="text-(--secondary)">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent) "
            >
              Login
            </button>
          </form>
          <div className="relative mb-6 mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to={"/register"} className="text-(--primary) hover:underline">
              {" "}
              create a acount
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
      </div>
    </>
  );
};

export default Login;
