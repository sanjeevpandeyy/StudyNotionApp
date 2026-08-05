import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { updateProfile } from "../../../../services/operations/SettingAPI";
import IconBtn from "../../../common/IconBtn";

const genders = [
  "Male",
  "Female",
  "Non-Binary",
  "Prefer not to say",
  "Other",
];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth
        ? user.additionalDetails.dateOfBirth.split("T")[0]
        : "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth
        ? user.additionalDetails.dateOfBirth.split("T")[0]
        : "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    });
  }, [user, reset]);

  const submitProfileForm = async (data) => {
    try {
      await dispatch(updateProfile(data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
      <div className="my-8 rounded-md border border-richblack-700 bg-richblack-800 p-5 sm:p-6 lg:my-10 lg:p-8 lg:px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* First & Last Name */}
        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="lable-style">
              First Name
            </label>

            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="form-style"
              {...register("firstName", { required: true })}
            />

            {errors.firstName && (
              <span className="text-xs text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="lable-style">
              Last Name
            </label>

            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="form-style"
              {...register("lastName", { required: true })}
            />

            {errors.lastName && (
              <span className="text-xs text-yellow-100">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="lable-style">
              Date of Birth
            </label>

            <input
              type="date"
              id="dateOfBirth"
              className="form-style"
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth.",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
            />

            {errors.dateOfBirth && (
              <span className="text-xs text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="lable-style">
              Gender
            </label>

            <select
              id="gender"
              className="form-style"
              {...register("gender", { required: true })}
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>

            {errors.gender && (
              <span className="text-xs text-yellow-100">
                Please select your Gender.
              </span>
            )}
          </div>
        </div>

        {/* Contact & About */}
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="lable-style">
              Contact Number
            </label>

            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: {
                  value: 12,
                  message: "Invalid Contact Number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid Contact Number",
                },
              })}
            />

            {errors.contactNumber && (
              <span className="text-xs text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="lable-style">
              About
            </label>

            <input
              type="text"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style"
              {...register("about", { required: true })}
            />

            {errors.about && (
              <span className="text-xs text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="w-full rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50 sm:w-auto"
        >
          Cancel
        </button>

        <div className="w-full sm:w-auto">
          <IconBtn type="submit" text="Save" />
        </div>
      </div>
    </form>
  );
}