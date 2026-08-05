import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { signup, sendOtp } from "../../../services/operations/authAPI";

const Signupform = ({ setloggedin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = useState(false);

  const [formdata, setformdata] = useState({
    workas: "Student",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    otp: "",
  });

  const [showpassword, setshowpassword] = useState("password");
  const [showconpassword, setconshowpassword] = useState("password");

  function changehandler(event) {
    setformdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function seePasswordHandler() {
    setshowpassword((prev) =>
      prev === "password" ? "text" : "password"
    );
  }

  function seeconPasswordHandler() {
    setconshowpassword((prev) =>
      prev === "password" ? "text" : "password"
    );
  }

  function submithandler(e) {
    e.preventDefault();

    if (!otpSent) {
      return toast.error("Please send OTP first");
    }

    dispatch(
      signup(
        formdata.workas,
        formdata.firstname,
        formdata.lastname,
        formdata.email,
        formdata.password,
        formdata.confirmpassword,
        formdata.otp,
        navigate
      )
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={submithandler} className="space-y-3 sm:space-y-4">

        <div className="flex w-full sm:w-fit rounded-full bg-gray-800 p-1 gap-1 sm:gap-2">
          <input
            type="radio"
            name="workas"
            value="Student"
            checked={formdata.workas === "Student"}
            id="student"
            onChange={changehandler}
            className="hidden"
          />

          <label
            htmlFor="student"
            className={`px-4 sm:px-6 py-2 rounded-full cursor-pointer transition-all duration-300 text-sm sm:text-base font-medium ${
              formdata.workas === "Student"
                ? "bg-richblack-900 text-richblack-50"
                : "text-gray-500 hover:text-richblack-50"
            }`}
          >
            Student
          </label>

          <input
            type="radio"
            name="workas"
            value="Instructor"
            checked={formdata.workas === "Instructor"}
            id="instructor"
            onChange={changehandler}
            className="hidden"
          />

          <label
            htmlFor="instructor"
            className={`px-4 sm:px-6 py-2 rounded-full cursor-pointer transition-all duration-300 text-sm sm:text-base font-medium ${
              formdata.workas === "Instructor"
                ? "bg-richblack-900 text-richblack-50"
                : "text-gray-500 hover:text-richblack-50"
            }`}
          >
            Instructor
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <label className="flex flex-col">
            <p className="mb-2 text-xs sm:text-sm font-medium">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter first name"
              onChange={changehandler}
              name="firstname"
              value={formdata.firstname}
              required
              className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-richblack-50 outline-none focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col">
            <p className="mb-2 text-xs sm:text-sm font-medium">
              Last Name
            </p>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={changehandler}
              name="lastname"
              value={formdata.lastname}
              className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-richblack-50 outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <p className="mb-2 text-xs sm:text-sm font-medium">
            Email Address <sup className="text-red-500">*</sup>
          </p>

          <input
            type="email"
            placeholder="Enter email address"
            onChange={changehandler}
            name="email"
            value={formdata.email}
            required
            className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-richblack-50 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            disabled={!formdata.email}
            onClick={() => {
              if (!formdata.email.trim()) {
                return toast.error("Enter your email first");
              }
              dispatch(sendOtp(formdata.email, setOtpSent));
            }}
            className={`self-end mt-2 text-xs sm:text-sm ${
              formdata.email
                ? "text-yellow-50 hover:text-yellow-100"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>
        </label>

        {otpSent && (
          <label className="flex flex-col">
            <p className="mb-2 text-xs sm:text-sm font-medium">
              OTP <sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="otp"
              value={formdata.otp}
              onChange={changehandler}
              placeholder="Enter OTP"
              required={otpSent}
              className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-richblack-50 outline-none focus:border-blue-500"
            />
          </label>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <label className="flex flex-col relative">
            <p className="mb-2 text-xs sm:text-sm font-medium">
              Create Password <sup className="text-red-500">*</sup>
            </p>

            <input
              type={showpassword}
              name="password"
              value={formdata.password}
              onChange={changehandler}
              placeholder="Enter password"
              required
              className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 pr-12 text-sm sm:text-base text-white"
            />

            <span
              onClick={seePasswordHandler}
              className="absolute right-3 sm:right-4 top-[40px] sm:top-[43px] cursor-pointer text-gray-400"
            >
              {showpassword === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </label>

          <label className="flex flex-col relative">
            <p className="mb-2 text-xs sm:text-sm font-medium">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>

            <input
              type={showconpassword}
              name="confirmpassword"
              value={formdata.confirmpassword}
              onChange={changehandler}
              placeholder="Confirm password"
              required
              className="bg-richblack-800 border border-gray-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 pr-12 text-sm sm:text-base text-white"
            />

            <span
              onClick={seeconPasswordHandler}
              className="absolute right-3 sm:right-4 top-[40px] sm:top-[43px] cursor-pointer text-gray-400"
            >
              {showconpassword === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-yellow-100 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black"
        >
          Create Account
        </button>

      </form>
    </div>
  );
};

export default Signupform;
