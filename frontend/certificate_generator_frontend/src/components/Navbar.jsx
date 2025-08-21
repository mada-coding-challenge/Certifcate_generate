import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import logo from "../assets/logo.png";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className=" flex justify-between  w-full items-center px-16 bg-white z-50 pt-2 position: fixed">
        {/* Left: Hamburger for mobile */}

        {/* Right: Logo */}
        <div className="">
          <a className=" font-bold text-primary">
            <img src={logo} className="w-[150px]" alt="" />
          </a>
        </div>

        <div className="">
          <div>
            <div className=" lg:hidden">
              <Hamburger
                duration={0.3}
                toggled={isOpen}
                toggle={setOpen}
                size={20}
              />
            </div>

            <ul
              tabIndex={0}
              className={`menu absolute dropdown-content mt-3 z-[1] p-2 shadow text-xl font-medium  w-[100%] bg-white  transition-all duration-300 ease-in-out ${
                isOpen ? "left-0 opacity-100" : "left-[-100%] opacity-0 "
              }`}
            >
              <li >
                <NavLink
                  to="/"
                  end
                  className="transition-colors duration-300 hover:text-[#008DC3] transition-all "
                >
                  إنشاء الشهادات
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/uploadCsv"
                  
                  className="transition-colors duration-300 hover:text-[#008DC3] transition-all "
                  
                >
                  رفع البيانات
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/certificates"
                  className="transition-colors duration-300 hover:text-[#008DC3] transition-all "
                  
                >
                  الشهادات الصادرة
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Full menu for desktop */}
          <ul className="menu menu-horizontal hidden lg:flex px-1 space-x-4 text-xl font-medium bg-white">
            <li>
              <NavLink
                to="/"
                className="transition-colors duration-300 hover:text-[#008DC3] transition-all"
                
              >
                إنشاء الشهادات
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/uploadCsv"
                className="transition-colors duration-300 hover:text-[#008DC3] transition-all"
                
              >
                رفع البيانات
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/certificates"
                className="transition-colors duration-300 hover:text-[#008DC3] transition-all"
                
              >
                الشهادات الصادرة
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
