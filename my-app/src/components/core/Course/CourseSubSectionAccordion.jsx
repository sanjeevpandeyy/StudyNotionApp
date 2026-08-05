import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="text-base sm:text-lg">
            <HiOutlineVideoCamera />
          </span>

          <p className="break-words">
            {subSec?.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;
