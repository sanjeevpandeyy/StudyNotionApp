import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";


const Loginform = ({ setloggedin }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [showpassword, setshowpassword] = useState("password");


  function ChangeHandler(event) {
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


  function submithandler(e) {
    e.preventDefault();

    dispatch(
      login(
        formdata.email,
        formdata.password,
        navigate
      )
    );
  }


  return (

    <form
      onSubmit={submithandler}
      className="space-y-5 sm:space-y-6"
    >


      <label className="flex flex-col">

        <p className="mb-2 text-xs sm:text-sm font-medium">
          Email Address <sup className="text-red-500">*</sup>
        </p>


        <input
          type="email"
          value={formdata.email}
          onChange={ChangeHandler}
          placeholder="Enter email address"
          name="email"
          required

          className="
          bg-gray-900 
          border border-gray-700 
          rounded-lg 
          px-3 py-2.5 
          sm:px-4 sm:py-3
          text-sm sm:text-base
          text-white 
          outline-none 
          focus:border-blue-500 
          transition-all
          "
        />

      </label>




      <label className="flex flex-col relative">


        <p className="mb-2 text-xs sm:text-sm font-medium">

          Password <sup className="text-red-500">*</sup>

        </p>



        <input

          type={showpassword}

          value={formdata.password}

          onChange={ChangeHandler}

          placeholder="Enter password"

          name="password"

          required


          className="
          bg-gray-900 
          border border-gray-700 
          rounded-lg 
          px-3 py-2.5
          sm:px-4 sm:py-3
          pr-12
          text-sm sm:text-base
          text-white 
          outline-none 
          focus:border-blue-500 
          transition-all
          "

        />



        <span

          onClick={seePasswordHandler}

          className="
          absolute 
          right-3 sm:right-4 
          top-[40px] sm:top-[43px]
          cursor-pointer 
          text-gray-400 
          hover:text-white 
          transition
          "

        >

          {
            showpassword === "password" 
            ? <FaEye /> 
            : <FaEyeSlash />
          }

        </span>




        <Link

          to="/forgot-password"

          className="
          text-right 
          mt-2 
          text-xs sm:text-sm
          text-blue-400 
          hover:text-blue-300 
          transition
          "

        >

          Forgot Password?

        </Link>


      </label>




      <button

        type="submit"

        className="
        text-center 
        text-xs sm:text-[13px]
        px-5 sm:px-6
        py-2.5 sm:py-3
        rounded-md 
        font-bold 
        bg-yellow-50 
        text-black 
        w-full
        "

      >

        Sign In

      </button>


    </form>

  );
};

export default Loginform;
