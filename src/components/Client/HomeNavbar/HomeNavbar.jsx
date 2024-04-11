import React, { useState } from "react";
import "./HomeNavbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  IconButton,
  Collapse
} from "@material-tailwind/react";

export function HomeNavbar() {
  const [openNav, setOpenNav] = useState(false);

  const navList = (
    <ul className="lg:flex flex-col lg:flex-row sm:py-1 lg:py-3 gap-2 lg:gap-6 justify-end">
      <li className="lg:pl-5 text-xl lg:text-xl uppercase text-white li-font">
        <Link to="/home" className="lemon-milk cursor-pointer hover:text-[color:var(--azul)] duration-300">
          Home
        </Link>
      </li>
      <li className="text-white lg:pl-5 text-xl lg:text-xl uppercase li-font">
        <Link to="/about-us" className="lemon-milk cursor-pointer hover:text-[color:var(--azul)] duration-300">
          About Us
        </Link>
      </li>
      <li className="text-white lg:pl-5 text-xl lg:text-xl uppercase li-font">
        <Link to="/all-movies" className="lemon-milk cursor-pointer hover:text-[color:var(--azul)] duration-300">
          All Movies
        </Link>
      </li>
      <li className="text-white lg:pl-5 text-xl lg:text-xl uppercase li-font">
        <Link to="/membership" className="lemon-milk cursor-pointer hover:text-[color:var(--azul)] duration-300">
          Membership
        </Link>
      </li>
      <li className="text-white lg:pl-5 text-xl lg:text-2xl uppercase li-font">
        <Link to="/account" className="lemon-milk cursor-pointer hover:text-[color:var(--azul)] duration-300">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </li>
    </ul>
  );

  const mobileNavList = (
    <ul className="mt-5 lg:flex flex-col lg:flex-row lg:py-10 gap-2 lg:gap-6 justify-end bg-transparent">
      <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font mb-2">
        <Link to="/home" className="lemon-milk flex cursor-pointer hover:text-[color:var(--azul)] duration-300 items-center">
          Home
        </Link>
      </li>
      <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font mb-2">
        <Link to="/about-us" className="lemon-milk flex cursor-pointer hover:text-[color:var(--azul)] duration-300 items-center">
          About Us
        </Link>
      </li>
      <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font mb-2">
        <Link to="/all-movies" className="lemon-milk flex cursor-pointer hover:text-[color:var(--azul)] duration-300 items-center">
          All Movies
        </Link>
      </li>
      <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font mb-2">
        <Link to="/membership" className="lemon-milk flex cursor-pointer hover:text-[color:var(--azul)] duration-300 items-center">
          Membership
        </Link>
      </li>
      <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font mb-2">
        <Link to="/account" className="lemon-milk flex cursor-pointer hover:text-[color:var(--azul)] duration-300 items-center">
          Account
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="fixed top-0 w-full z-50">
      <Navbar
        color="transparent"
        className="max-w-full px-4 py-2 lg:px-8 lg:py-4"
      >
        <div className="flex items-center justify-between">
          <div className="text-2xl lg:text-3xl uppercase font-normal text-white galarama flex flex-end">
            <Link
              to="/home"
              className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
            >
              LUXYNEMA
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <div className="text-white hover:text-[color:var(--azul)] duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ) : (
                <div className="text-white hover:text-[color:var(--azul)] duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {mobileNavList}
        </Collapse>
      </Navbar>
    </div >
  );
}