import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../services/operations/authAPI";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      resetPassword(
        password,
        confirmPassword,
        token,
        navigate
      )
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Choose New Password
          </h1>

          <p className="mt-3 text-richblack-200">
            Almost done! Enter your new password below to complete the password
            reset process.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Password */}
            <div className="relative">
              <label>
                <p className="mb-2 text-sm text-richblack-5">
                  New Password
                  <sup className="text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="form-style w-full pr-12"
                />
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-richblack-300"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label>
                <p className="mb-2 text-sm text-richblack-5">
                  Confirm Password
                  <sup className="text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="form-style w-full pr-12"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-[42px] text-richblack-300"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 transition-all hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-6 flex items-center gap-2 text-richblack-100 hover:text-yellow-50"
          >
            <BiArrowBack />
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;