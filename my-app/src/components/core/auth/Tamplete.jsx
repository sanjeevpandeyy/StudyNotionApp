import bgimg from "../../../assets/Images/frame.png";
import loginimg from "../../../assets/Images/login.webp";
import signupimg from "../../../assets/Images/signup.webp";

import Loginform from "./Loginform";
import Signupform from "./Signupfrom";
import CTAButton from "./../homePage/Button";

const Template = ({
  title,
  desc1,
  desc2,
  formtype,
  setloggedin,
}) => {
  return (
    <div className="min-h-[100vh] bg-richblack-900 text-richblack-50 flex justify-center items-center px-4 sm:px-6 py-8 sm:py-10">

      <div className="w-full sm:w-[90%] grid lg:grid-cols-2 gap-6 lg:gap-40 items-center">

        {/* Left Section */}

        <div className="w-full lg:w-[85%]">

          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-lg text-gray-400">
            {desc1}
            <br />
            <span className="text-cyan-400 italic">
              {desc2}
            </span>
          </p>

          <div className="mt-6">
            {formtype === "signup" ? (
              <Signupform setloggedin={setloggedin} />
            ) : (
              <Loginform setloggedin={setloggedin} />
            )}
          </div>

          {/* Divider */}

          <div className="flex items-center gap-3 sm:gap-4 my-3">

            <div className="flex-1 h-[1px] bg-gray-700"></div>

            <p className="text-sm sm:text-base text-gray-400">
              OR
            </p>

            <div className="flex-1 h-[1px] bg-gray-700"></div>

          </div>

          {/* Google Button */}

          <div className="flex w-full items-center justify-center">

            <div className="flex justify-center w-full">

              <CTAButton>
                <div className="flex flex-row gap-3 sm:gap-5 px-5 sm:px-10 text-sm sm:text-[20px] items-center">

                  <img
                    src="https://cdn.codechef.com/images/icons/google.svg"
                    loading="lazy"
                    className="w-5 h-5 sm:w-[25px] sm:h-[25px]"
                    alt="Google"
                  />

                  Continue with Google

                </div>
              </CTAButton>

            </div>

          </div>

        </div>


        {/* Right Section */}

        <div className="hidden lg:flex relative items-start justify-center">

          <img
            loading="lazy"
            src={bgimg}
            alt="Background Pattern"
            className="
              relative
              w-[90%]
              rounded-xl
              opacity-50
            "
          />

          <img
            loading="lazy"
            src={
              formtype === "signup"
                ? signupimg
                : loginimg
            }
            alt="Student"
            className="
              w-[90%]
              absolute
              z-10
              rounded-xl
              shadow-2xl
              -top-5
              -left-5
            "
          />

        </div>

      </div>

    </div>
  );
};

export default Template;