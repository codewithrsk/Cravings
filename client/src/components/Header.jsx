import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin, setIsLogin } = useAuth();
  const handallogout = () => {
    sessionStorage.clear();
    navigate("/");
    setIsLogin(false);
  };

  return (
    <>
      <div className="w-full bg-(--primary) ">
        <div className="w-[90%] mx-auto flex items-center justify-between h-[10vh]">
          <div>
            <Link to="/" className="navbar-brand text-white m-0 p-0">
              <img
                src="https://cravings.ricr.in/assets/transparentLogoLight-De2Z7I01.png"
                alt="Cravings Logo"
                width="100"
              />
            </Link>
          </div>
          <div className="flex gap-4 justify-center text-(--primary-text) decoration-(--success) decoration-3">
            <Link to={"/"} className="hover:text-(--accent) hover:underline">
              Home{" "}
            </Link>
            <Link
              to={"/about"}
              className="hover:text-(--accent) hover:underline "
            >
              About{" "}
            </Link>
            <Link
              to={"/contact-us"}
              className="hover:text-(--accent) hover:underline"
            >
              ContactUs{" "}
            </Link>
            {isLogin ? (
              <>
                <div className="h-10 w-10 rounded-full overflow-hidden ">
                  <img
                    src={user.photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>{user.fullName}</div>
                <button onClick={handallogout}>
                  <MdOutlineLogout />
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to={"/login"}
                  className="hover:text-(--accent) hover:underline"
                >
                  Login{" "}
                </Link>
                <Link
                  to={"/register"}
                  className="hover:text-(--accent) hover:underline"
                >
                  Register{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
