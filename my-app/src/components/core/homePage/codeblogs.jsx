import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

import CTAButton from "./Button";

const Codeblogs = ({
  position,
  heading,
  subheading,
  CTABtn1,
  CTABtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`
        mx-auto
        my-20
        flex
        w-full
        ${position}
        items-center
        justify-between
        gap-10
        lg:gap-20
        px-4
        sm:px-6
        lg:px-12
      `}
    >
      {/* Left Section */}
      <div className="flex w-full flex-col gap-6 lg:w-[42%]">
        {heading}

        <p className="text-base font-medium text-richblack-300">
          {subheading}
        </p>

        <div className="flex flex-wrap gap-4">
          <CTAButton active={CTABtn1.active} linkto={CTABtn1.linkto}>
            <div className="flex items-center gap-2">
              {CTABtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={CTABtn2.active} linkto={CTABtn2.linkto}>
            {CTABtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="
          relative
          flex
          h-fit
          w-full
          max-w-2xl
          flex-row
          overflow-hidden
          rounded-xl
          border
          border-white/5
          bg-white/[0.02]
          py-4
          text-sm
          backdrop-blur-3xl
          lg:w-[480px]
        "
      >
        {/* Background Gradient */}
        <div
          className={`
            absolute
            -left-5
            top-0
            h-[120px]
            w-[250px]
            rounded-[30%]
            blur-[60px]
            opacity-40
            ${backgroundGradient}
          `}
        />

        {/* Line Numbers */}
        <div className="flex w-12 flex-col items-center font-bold text-richblack-400">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div
          className={`
            w-full
            overflow-x-auto
            pr-4
            font-mono
            font-bold
            ${codeColor}
          `}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            speed={50}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Codeblogs;