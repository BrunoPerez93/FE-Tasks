import React, { useState } from "react";
import LinkNavbar from "./LinkNavbar";
import { Button } from "../ui/button";

const Navbar = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="dark:bg-gray-900 w-full p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        
        <div className="hidden md:flex justify-center flex-grow">
          <ul className="flex md:space-x-6 items-center">
            <LinkNavbar to="/tasksList" text="Tasks" />
            <LinkNavbar to="/addTask" text="New Task" />
          </ul>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-controls="navbar"
            aria-expanded={isMobileMenuOpen}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex justify-center flex-grow">
          <Button onClick={onLogout} className="text-white">
            Logout
          </Button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } fixed top-0 left-0 w-full bg-gray-200 md:hidden transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col justify-center items-center space-y-2 p-4 rounded-lg dark:border-gray-700">
            <LinkNavbar to="/tasksList" text="Tasks" />
            <LinkNavbar to="/addTask" text="New Task" />
            <Button onClick={onLogout} className="text-white">
              Logout
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
