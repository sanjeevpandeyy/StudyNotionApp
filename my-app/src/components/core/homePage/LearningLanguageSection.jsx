import React from "react";
import HighlightText from "./HighlightText";
import Know_Your_Progress from "../../../assets/Images/Know_Your_Progress.svg";
import Compare_with_other from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-24 md:mt-28 xl:mt-32">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center text-3xl font-bold md:text-4xl">
          Your Swiss Knife for{" "}
          <HighlightText text="learning any language" />
        </div>

        <p className="mx-auto w-full max-w-3xl px-4 text-center text-base font-medium text-richblack-600">
          Using Spin makes learning multiple languages easy with 20+ languages,
          realistic voice-over, progress tracking, custom schedules, and more.
        </p>

        {/* Images */}
        <div className="mt-8 grid w-full grid-cols-1 sm:grid-cols-1 justify-items-center md:gap-8 md:grid-cols-2 xl:grid-cols-3 mb-0 lg:mb-0 md:-mb-60">
          <img
            src={Know_Your_Progress}
            alt="Know Your Progress"
            loading="lazy"
            className="
              w-full
              max-w-[320px]
              object-contain
              md:max-w-[360px]
              xl:max-w-[400px]
              xl:translate-x-30
              md:translate-x-15
              z-10

            "
          />

          <img
            src={Compare_with_other}
            alt="Compare with Others"
            loading="lazy"
            className="
              w-full
              max-w-[320px]
              object-contain
              md:max-w-[360px]
              xl:max-w-[400px]
              md:-translate-x-15
              xl:-translate-x-0
              z-20
            "
          />

          <img
            src={Plan_your_lessons}
            alt="Plan your Lessons"
            loading="lazy"
            className="
              w-[130%]
              max-w-[400px]
              object-contain
              md:col-span-2
              sm:justify-self-center
              md:max-w-[400px]
              xl:col-span-1
              xl:max-w-[400px]
              xl:-translate-x-40
              xl:-translate-y-0
              md:-translate-y-44
              xl:z-30
              z-16
            "
          />
        </div>

        <div className="mt-10">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;