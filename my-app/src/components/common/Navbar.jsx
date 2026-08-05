import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";

import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

import {
  IoIosArrowDropdownCircle,
  IoMdLogOut,
} from "react-icons/io";

import {
  MdDashboard,
} from "react-icons/md";

import ProfileDropdown from "../core/auth/ProfileDropdown";

import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector(
        "GET",
        categories.CATEGORIES_API
      );

      setSubLinks(result.data.allCategory);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);
  return (
    <div
      className={`${
        matchRoute("/")
          ? "bg-richblack-900"
          : "bg-richblack-700"
      } border-b border-richblack-700`}
    >
      <div className="mx-auto flex h-14 w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={42}
            loading="lazy"
          className="hidden lg:flex lg:w-[160px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((element, index) => (
              <li key={index}>
                {element.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p className="text-richblack-25">Catalog</p>

                    <IoIosArrowDropdownCircle className="text-[18px]" />

                    <div className="invisible absolute left-1/2 top-full z-50 mt-3 flex w-[300px] -translate-x-1/2 flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">

                      <div className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-richblack-5"></div>

                      {subLinks.length > 0 ? (
                        subLinks.map((subLink) => (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="w-full rounded-md px-4 py-3 text-sm font-medium transition-all hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-richblack-400">
                          No Categories Found
                        </p>
                      )}

                    </div>
                  </div>
                ) : (
                  <Link to={element.path}>
                    <p
                      className={`${
                        matchRoute(element.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {element.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-x-4 lg:flex">

          {user && user.accountType !== "Instructor" && user.accountType !== "Admin" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-5" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-[10px] border border-richblack-700 bg-richblack-900 px-4 py-2 text-white">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-[10px] border border-richblack-700 bg-richblack-900 px-4 py-2 text-white">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropdown />}
        </div>
                {/* Mobile / Tablet Navbar */}
            
<div className="flex flex-1 items-center justify-between lg:hidden">

{/* Left */}
<div className="flex items-center gap-3">

  <button
    onClick={() => setShowMobileMenu(true)}
    className="rounded-md p-1 text-richblack-5 hover:bg-richblack-700"
  >
    <AiOutlineMenu className="text-[28px]" />
  </button>

  <Link to="/">
    <img
      src={logo}
      alt="Logo"
      className="w-[120px]"
    />
  </Link>

</div>

{/* Right */}
<div className="flex items-center gap-4">

  {user && user.accountType !== "Instructor" && (
    <Link to="/dashboard/cart" className="relative">

      <AiOutlineShoppingCart className="text-[25px] text-richblack-5" />

      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-bold text-richblack-900">
          {totalItems}
        </span>
      )}

    </Link>
  )}

  {token && (
    <img
      src={user?.image}
      alt="Profile"
      className="h-9 w-9 rounded-full border border-richblack-600 object-cover"
    />
  )}

</div>

</div>
            </div>

            {/* Overlay */}
            {showMobileMenu && (
            <div
            onClick={() => setShowMobileMenu(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            )}

            {/* Mobile Drawer */}
            <div
            className={`fixed left-0 top-0 z-50 h-screen w-[250px] bg-richblack-900 shadow-2xl transition-all duration-300 lg:hidden ${
            showMobileMenu
              ? "translate-x-0"
              : "-translate-x-full"
            }`}
            >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between border-b border-richblack-700 px-5 py-4">
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-[130px]"
                      />

                      <button
                        onClick={() => setShowMobileMenu(false)}
                        className="rounded-md p-1 text-richblack-5 hover:bg-richblack-700"
                      >
                        <AiOutlineClose className="text-[28px]" />
                      </button>
                    </div>

                    {/* Drawer Body */}
                    <div className="flex h-[calc(100vh-72px)] flex-col overflow-y-auto px-4 py-5">

                      <div className="divide-y divide-richblack-700">

                        {NavbarLinks.map((element, index) => (
                          <div key={index}>

                            {element.title === "Catalog" ? (
                              <>
                                <button
                                  onClick={() => setShowCatalog(!showCatalog)}
                                  className="flex w-full items-center justify-between px-4 py-4 text-richblack-25 transition hover:bg-richblack-800"
                                >
                                  <span>{element.title}</span>

                                  <IoIosArrowDropdownCircle
                                    className={`text-xl transition-transform ${
                                      showCatalog ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {showCatalog && (
                                  <div className="border-t border-richblack-700 bg-richblack-900">

                                    {subLinks.map((subLink) => (
                                      <Link
                                        key={subLink._id}
                                        to={`/catalog/${subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`}
                                        onClick={() => {
                                          setShowMobileMenu(false);
                                          setShowCatalog(false);
                                        }}
                                        className="block border-b border-richblack-700 px-8 py-3 text-sm text-richblack-200 transition hover:bg-richblack-800 last:border-b-0"
                                      >
                                        {subLink.name}
                                      </Link>
                                    ))}

                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                to={element.path}
                                onClick={() => setShowMobileMenu(false)}
                                className={`block px-4 py-4 transition ${
                                  matchRoute(element.path)
                                    ? "bg-yellow-50 font-semibold text-richblack-900"
                                    : "text-richblack-25 hover:bg-richblack-800"
                                }`}
                              >
                                {element.title}
                              </Link>
                            )}

                          </div>
                        ))}

                      </div>

                      {token && (
                        <>
                          <div className="my-5 border-t border-richblack-700"></div>

                          <Link
                            to="/dashboard/my-profile"
                            onClick={() => setShowMobileMenu(false)}
                            className="flex items-center gap-3 border-b border-richblack-700 px-4 py-4 text-richblack-25 transition hover:bg-richblack-800"
                          >
                            <MdDashboard className="text-xl" />
                            Dashboard
                          </Link>

                          <button
                            onClick={() => {
                              dispatch(logout(navigate));
                              setShowMobileMenu(false);
                            }}
                            className="flex items-center gap-3 px-4 py-4 text-red-300 transition hover:bg-red-900/20"
                          >
                            <IoMdLogOut className="text-xl" />
                            Logout
                          </button>
                        </>
                      )}

                      {!token && (
                        <>
                          <div className="my-5 border-t border-richblack-700"></div>

                          <Link
                            to="/login"
                            onClick={() => setShowMobileMenu(false)}
                          >
                            <button className="mb-3 w-full rounded-lg border border-richblack-700 bg-richblack-800 py-3 text-richblack-5">
                              Log In
                            </button>
                          </Link>

                          <Link
                            to="/signup"
                            onClick={() => setShowMobileMenu(false)}
                          >
                            <button className="w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900">
                              Sign Up
                            </button>
                          </Link>
                        </>
                      )}

                    </div>
                  </div>
                </div>
              );
            };

            export default Navbar;