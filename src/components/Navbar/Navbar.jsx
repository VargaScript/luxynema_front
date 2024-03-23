import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

import { useMediaQuery } from "@material-ui/core";

export const Navbar = () => {
  const isMdUp = useMediaQuery("(min-width: 768px)"); // md y superior
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenus = () => {
    setOpen(!open);
  };

  console.log(isOpen);

  return (
    <>
      <div className="above-all">
        {isMdUp ? (
          <nav className="-mb-40 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row lg:justify-between xl:justify-between 2xl:justify-between lg:items-center xl:items-center 2xl:items-center">
            <div className="flex items-center justify-between px-4 lg:px-16 py-4 lg:py-10 lg:mr-32">
              <div className="text-2xl lg:text-3xl uppercase font-normal text-white galarama flex flex-end">
                <Link
                  to="/home"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  LUXYNEMA
                </Link>
              </div>
              <button
                className="lg:hidden bg-transparent text-white inline"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </button>
            </div>
            <ul
              className={`${
                isOpen ? "flex flex-col" : "hidden"
              } lg:flex flex-col lg:flex-row sm:py-1 py-2 px-5 lg:py-10 gap-2 lg:gap-6 justify-end`}
            >
              <li className="lg:pl-5 lg:-ml-10 text-xl lg:text-2xl uppercase text-white li-font">
                <Link
                  to="/home"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  Home
                </Link>
              </li>

              <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font">
                <Link
                  to="/about-us"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  About Us
                </Link>
              </li>
              <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font">
                <Link
                  to="/my-movies"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  My Movies
                </Link>
              </li>
              <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font">
                <Link
                  to="/movies"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  Membresia
                </Link>
              </li>
              <li className="lg:pl-5 text-xl lg:text-2xl uppercase text-white li-font">
                <Link
                  to="/account"
                  className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="above-all">
            <a
              className="lg:hidden bg-transparent text-white inline"
              onClick={toggleMenus}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </a>
          </div>
        )}

        <Drawer open={open} onClose={closeDrawer}>
          <div className="mb-2 flex items-center justify-between p-4">
            <Typography variant="h5" color="blue-gray">
              Settings
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <List>
            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/home"
                className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
              >
                Home
              </Link>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/account"
                className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
              >
                Profile
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              <Link
                to="/about-us"
                className="cursor-pointer hover:text-[color:var(--azul)] duration-300"
              >
                About us
              </Link>
            </ListItem>
          </List>
          <Button size="sm" variant="outlined">
            Sign out
          </Button>
        </Drawer>
      </div>
    </>
  );
};
