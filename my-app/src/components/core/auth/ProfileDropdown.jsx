import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <img
          loading="lazy"
          src={user?.image}
          alt="Profile"
          className="h-9 w-9 rounded-full border border-richblack-600 object-cover"
        />

        <FiChevronDown
          className={`text-richblack-100 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-lg border border-richblack-700 bg-richblack-800 shadow-xl">
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-richblack-50 transition-colors hover:bg-richblack-700"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              dispatch(logout(navigate));
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-richblack-50 transition-colors hover:bg-richblack-700"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
