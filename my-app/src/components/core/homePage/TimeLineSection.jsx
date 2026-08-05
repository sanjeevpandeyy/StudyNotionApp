import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];

const TimeLineSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">

        {/* Left */}
        <div className="w-full lg:w-[45%]">
          {timeline.map((element, index) => (
            <div key={index}>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                  <img src={element.Logo} alt={element.heading} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-richblack-5">
                    {element.heading}
                  </h2>

                  <p className="mt-1 text-sm text-richblack-300">
                    {element.Description}
                  </p>
                </div>
              </div>

              {index !== timeline.length - 1 && (
                <div className="ml-[22px] my-2 h-20 w-[2px] bg-[radial-gradient(circle,#6E727F_1.5px,transparent_1.5px)] bg-[length:2px_8px] bg-repeat-y"></div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-[620px] lg:w-[55%]">
          <img
            src={TimelineImage}
            alt="Timeline"
            loading="lazy"
            className="w-full rounded-lg object-cover shadow-2xl"
          />

          <div
            className="
              absolute
              left-1/2
              bottom-0
              flex
              w-[92%]
              -translate-x-1/2
              translate-y-1/2
              flex-col
              bg-caribbeangreen-700
              text-white
              uppercase
              sm:flex-row
            "
          >
            <div
                className="
                  absolute
                  left-1/2
                  bottom-0
                  -translate-x-1/2
                  translate-y-1/2
                  flex
                  w-[85%]
                  max-w-[420px]
                  flex-col
                  bg-caribbeangreen-700
                  text-white
                  uppercase
                  sm:flex-row
                "
              >
                <div className="flex flex-1 items-center justify-center gap-3 border-b border-caribbeangreen-300 px-4 py-4 sm:border-b-0 sm:border-r">
                  <p className="text-2xl font-bold md:text-3xl">10</p>

                  <p className="max-w-[70px] text-[10px] leading-4 text-caribbeangreen-300 sm:text-xs">
                    Years of Experience
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-center gap-3 px-4 py-4">
                  <p className="text-2xl font-bold md:text-3xl">250</p>

                  <p className="max-w-[70px] text-[10px] leading-4 text-caribbeangreen-300 sm:text-xs">
                    Types of Courses
                  </p>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimeLineSection;