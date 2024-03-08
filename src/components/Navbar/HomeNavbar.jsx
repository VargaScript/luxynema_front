/* import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Drawer, IconButton } from "@material-tailwind/react"; */

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse
} from "@material-tailwind/react";

export function HomeNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="lg:flex flex-col lg:flex-row sm:py-1 px-5 lg:py-3 gap-2 lg:gap-6 justify-end">
      <li className="lg:pl-5 text-xl lg:text-xl uppercase text-[color:var(--azul-fuerte)] li-font"
      >
        <Link to="/home"
          className="cursor-pointer hover:text-[color:var(--azul)] duration-300">
          Home
        </Link>
      </li>
      <li className="text-[color:var(--azul-fuerte)] lg:pl-5 text-xl lg:text-xl uppercase li-font"
      >
        <Link
          to="/about-us"
          className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
        >
          About Us
        </Link>
      </li>
      <li className="text-[color:var(--azul-fuerte)] lg:pl-5 text-xl lg:text-xl uppercase li-font">
        <Link
          to="/my-movies"
          className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
        >
          My Movies
        </Link>
      </li>
      <li className="text-[color:var(--azul-fuerte)] lg:pl-5 text-xl lg:text-xl uppercase li-font">
        <Link
          to="/membership"
          className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
        >
          Membership
        </Link>
      </li>
      <li className="text-[color:var(--azul-fuerte)] lg:pl-5 text-xl lg:text-2xl uppercase li-font">
        <Link
          to="/account"
          className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
        >
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </li>
    </ul>
  );

  const mobileNavList = (<ul className="mt-5 lg:flex flex-col lg:flex-row lg:py-10 gap-2 lg:gap-6 justify-end">
    <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-[color:var(--azul-fuerte)] li-font mb-2">
      <IconButton variant="gradient" color="blue-gray" className="rounded-full">
        <i className="fa-solid fa-house"></i>
      </IconButton>
      <Link
        to="/home"
        className="cursor-pointer hover:text-[color:var(--azul)] duration-300 ml-3"
      >
        Home
      </Link>
    </li>
    <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-[color:var(--azul-fuerte)] li-font mb-2">
      <IconButton variant="gradient" color="blue-gray" className="rounded-full">
        <i className="fa-solid fa-credit-card"></i>
      </IconButton>
      <Link
        to="/about-us"
        className="cursor-pointer hover:text-[color:var(--azul)] duration-300 ml-3"
      >
        About Us
      </Link>
    </li>
    <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-[color:var(--azul-fuerte)] li-font mb-2">
      <IconButton variant="gradient" color="blue-gray" className="rounded-full">
        <i className="fa-solid fa-video"></i>
      </IconButton>
      <Link
        to="/my-movies"
        className="cursor-pointer hover:text-[color:var(--azul)] duration-300 ml-3"
      >
        My Movies
      </Link>
    </li>
    <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-[color:var(--azul-fuerte)] li-font mb-2">
      <IconButton variant="gradient" color="blue-gray" className="rounded-full">
        <i className="fa-solid fa-credit-card"></i>
      </IconButton>
      <Link
        to="/movies"
        className="cursor-pointer hover:text-[color:var(--azul)] duration-300 ml-3"
      >
        Membership
      </Link>
    </li>
    <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-[color:var(--azul-fuerte)] li-font mb-2">
      <IconButton variant="gradient" color="blue-gray" className="rounded-full">
        <i className="fa-solid fa-user"></i>
      </IconButton>
      <Link
        to="/account"
        className="cursor-pointer hover:text-[color:var(--azul)] duration-300 ml-3"
      >
        Account
      </Link>
    </li>
  </ul>)

  return (
    <div className="max-h-[768px]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl lg:text-3xl uppercase font-normal text-[color:var(--azul-fuerte)] galarama flex flex-end">
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
                <div className="text-[color:var(--azul-fuerte)] hover:text-[color:var(--azul)] duration-300">
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
                <div className="text-[color:var(--azul-fuerte)] hover:text-[color:var(--azul)] duration-300">
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
    </div>
  );
}

