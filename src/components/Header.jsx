import React, { useState } from "react";
import iconDown from "../assets/iconDown.svg";
import iconUp from "../assets/iconUp.svg";
import Ellipsis from "../assets/IconVerticalEllipses.svg";
import HeaderDropDown from "./HeaderDropDown";

const Header = () => {
  const [openDrowndown, setOpenDrowndown] = useState(false);
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* <img src={logo} alt="logo" /> */}
          <h3 className=" md:inline-block font-bold font-sans">TM</h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              Board Name
            </h3>
            <img
              src={openDrowndown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 cursor-pointer md:hidden"
              onClick={() => setOpenDrowndown((state) => !state)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4 items-center md:space-x-4">
          <button className="hidden md:block button">+ Add New Task</button>
          <button className="button py-1 px-3 md:hidden">+</button>
          <img src={Ellipsis} alt="ellipsis" className="cursor-pointer h-6" />
        </div>
      </header>

      {openDrowndown && <HeaderDropDown setOpenDrowndown={setOpenDrowndown} />}
    </div>
  );
};

export default Header;
