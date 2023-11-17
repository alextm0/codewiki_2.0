import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

import SideMenu from './SideMenu'

import { Button } from "@material-tailwind/react";


function Navbar() {
  const [sidebar, setSidebar] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdown]);

  function toggleDropdown() {
    setDropdown((prev) => !prev);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };


  return (
    <header className="">
      <div className="max-w-screen-xl items py-4 px-8 mx-auto">
        <div className="relative flex items-center justify-between space-x-4 lg:space-x-10 ">
          <div className="flex items-center lg:w-0 lg:flex-1 text-gray-900 font-righteous text-3xl">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="logo" className="mr-2 w-8 h-8" />
              <span className="w-32 h-10 rounded-lg flex justify-center items-center text-white ">
                {" "}
                CodeWiki{" "}
              </span>
            </Link>
          </div>

          <nav className="hidden space-x-8 text-sm mt-2 font-medium md:flex">
            <div class="relative after:absolute after:bg-gray-200 mt-2 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
              <Link
                to="/articles"
                className="text-gray-500 hover:text-white"
              >
                {" "}
                Articole{" "}
              </Link>
            </div>
            {/* Dropdown */}
            <div class="flex items-center justify-center">
              <div ref={dropdownRef} class="relative inline-block">
                {/* <!-- Dropdown toggle button --> */}
                <div class="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                  <button
                    onClick={toggleDropdown}
                    class="inline-flex text-gray-500 gap-1 items-center relative z-10 p-2 focus:outline-none hover:text-white"
                  >
                    Categorii <IoMdArrowDropdown />
                  </button>
                </div>

                {/* <!-- Dropdown menu --> */}
                {dropdown && (
                  <div class="absolute left-0 z-20 w-48 p-2 mt-2 bg-white rounded-xl shadow-xl">
                    <Link to={"/admitere"}>
                      <div class="block px-4 py-3 text-sm rounded-xl text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-200 active:bg-purple-500 active:text-gray-200">
                        {" "}
                        Admitere{" "}
                      </div>
                    </Link>

                    <Link to={"/bacalaureat"}>
                      <div class="block px-4 py-3 text-sm rounded-xl text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-200 active:bg-purple-500 active:text-gray-200">
                        {" "}
                        Bacalaureat{" "}
                      </div>
                    </Link>

                    <Link to={"/olimpiada"}>
                      <div class="block px-4 py-3 text-sm rounded-xl text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-200 active:bg-purple-500 active:text-gray-200">
                        {" "}
                        Olimpiada{" "}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div class="relative after:absolute after:bg-gray-200 mt-2 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
              <Link
                to="/problems"
                className="text-gray-500 hover:text-white"
              >
                {" "}
                Probleme{" "}
              </Link>
            </div>
          </nav>

          <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            <Link to={"/login"}>
              <Button size="" className="px-5 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg capitalize">Sign up</Button>
            </Link>

            <Link to={"/signup"}>
              <Button size="" className="px-5 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg capitalize">Sign up</Button>
            </Link>
          </div>

          {/* FOR MOBILE VERSION */}
          <button onClick={toggleSidebar} type="button" class="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
            <span class="sr-only">Toggle Navigation</span>
            <svg class="flex-shrink-0 w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>

          <div
            id="docs-sidebar"
            className={`hs-overlay ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 transform fixed top-0 start-[-20px] bottom-0 z-[60] w-64 bg-slate-700 border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:hidden`}
          >            <div class="px-6">
              <a class="flex items-center text-xl font-semibold text-white" href="#" aria-label="Brand">
                <img src={Logo} alt="logo" className="mr-2 w-8 h-8" />
                CodeWiki
              </a>
            </div>

            <nav class="hs-accordion-group pt-10 p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul class="space-y-1.5">
                <li>
                  <a class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-base text-slate-700 rounded-lg hover:text-white hover:bg-gray-900 dark:bg-slate-700 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    Home
                  </a>
                </li>

                <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                  Articole
                </a></li>




                <li><a class="flex items-center pb-6 gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  Probleme
                </a></li>

                <svg height="4" width="100%" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#CCCCCC" stroke-width="1" />
                </svg>

                <div className="py-5">
                  <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    Bacalaureat
                  </a></li>


                  <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    Admitere
                  </a></li>

                  <li><a class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    Olimpiada
                  </a></li>
                </div>


              </ul>
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;