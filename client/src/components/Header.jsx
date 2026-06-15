import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <div className="flex gap-4 justify-center text-(--primary-text)">
            <Link to={"/"} className="hover:text-(--accent)">
              Home{" "}
            </Link>
            <Link to={"/about"} className="hover:text-(--accent)">
              About{" "}
            </Link>
            <Link to={"/contact-us"} className="hover:text-(--accent)">
              ContactUs{" "}
            </Link>
            <Link to={"/login"} className="hover:text-(--accent)">
              Login{" "}
            </Link>
            <Link to={"/register"} className="hover:text-(--accent)">
              Register{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
