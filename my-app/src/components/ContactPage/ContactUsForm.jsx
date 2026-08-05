import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/api";

const countryOptions = CountryCode.map((country) => ({
  value: country.code,
  label: `${country.code} ${country.country}`,
}));

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      countrycode: "+91",
    },
  });

  const submitContactForm = async (data) => {
    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      if (response?.data?.success) {
        toast.success(response.data.message || "Message sent successfully!");
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
        countrycode: "+91",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First & Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="label-style">First Name</label>

          <input
            type="text"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", {
              required: "First name is required",
            })}
          />

          {errors.firstname && (
            <span className="text-xs text-yellow-100">
              {errors.firstname.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="label-style">Last Name</label>

          <input
            type="text"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="label-style">Email Address</label>

        <input
          type="email"
          placeholder="Enter email"
          className="form-style"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <span className="text-xs text-yellow-100">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="label-style">Phone Number</label>

        <div className="flex gap-4">
          {/* Country Code */}
          <div className="w-[180px]">
            <Controller
              name="countrycode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countryOptions}
                  isSearchable
                  placeholder="Search..."
                  value={countryOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selected) =>
                    field.onChange(selected.value)
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#161D29",
                      borderColor: "#2C333F",
                      minHeight: "48px",
                      color: "#fff",
                      boxShadow: "none",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#161D29",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#2C333F"
                        : "#161D29",
                      color: "#fff",
                      cursor: "pointer",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#999",
                    }),
                  }}
                />
              )}
            />
          </div>

          {/* Phone Number */}
          <div className="flex-1">
          <input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            placeholder="12345 67890"
            className="form-style"
            maxLength={12}
            {...register("phoneNo", {
              required: "Please enter your Phone Number.",
              pattern: {
                value: /^[0-9]{10,12}$/,
                message: "Invalid Phone Number",
              },
            })}
          />

            {errors.phoneNo && (
              <span className="text-xs text-yellow-100">
                {errors.phoneNo.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="label-style">Message</label>

        <textarea
          rows={7}
          placeholder="Enter your message"
          className="form-style"
          {...register("message", {
            required: "Message is required",
          })}
        />

        {errors.message && (
          <span className="text-xs text-yellow-100">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-black font-semibold transition-all duration-300 ${
          loading
            ? "cursor-not-allowed opacity-60"
            : "hover:scale-95 hover:shadow-lg"
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
