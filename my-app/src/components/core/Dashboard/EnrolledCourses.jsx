import { useEffect, useState } from "react";
import * as ProgressBarModule from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

const ProgressBar =
  ProgressBarModule.default?.default || ProgressBarModule.default;

export default function EnrolledCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses();
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  if (!enrolledCourses) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!enrolledCourses.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-richblack-5">
          Enrolled Courses
        </h1>

        <p className="grid h-[20vh] place-items-center rounded-xl border border-richblack-700 bg-richblack-800 text-richblack-200">
          You have not enrolled in any course yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-richblack-5">
        Enrolled Courses
      </h1>

      <div className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800">

        {/* Desktop Header */}
        <div className="hidden border-b border-richblack-700 bg-richblack-700 px-6 py-4 text-sm font-semibold text-richblack-200 md:grid md:grid-cols-[2fr_1fr_1fr]">
          <p>Course Name</p>
          <p>Duration</p>
          <p>Progress</p>
        </div>

        {
          enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="
                flex
                flex-col
                gap-5
                border-b
                border-richblack-700
                p-5
                transition-all
                hover:bg-richblack-700
                md:grid
                md:grid-cols-[2fr_1fr_1fr]
                md:items-center
                md:gap-4
              "
            >

              {/* Course */}
              <div
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                "
              >

                <img
                  loading="lazy"
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="
                    h-16
                    w-16
                    shrink-0
                    rounded-lg
                    object-cover
                    sm:h-20
                    sm:w-20
                  "
                />

                <div className="min-w-0">

                  <p className="truncate font-semibold text-richblack-5">
                    {course.courseName}
                  </p>

                  <p className="mt-1 text-xs text-richblack-300 sm:text-sm">
                    {course.courseDescription?.length > 70
                      ? `${course.courseDescription.slice(0, 70)}...`
                      : course.courseDescription}
                  </p>

                </div>

              </div>


              {/* Duration */}
              <div className="text-sm text-richblack-100">

                <span className="font-semibold text-richblack-300 md:hidden">
                  Duration:{" "}
                </span>

                {course?.totalDuration || "N/A"}

              </div>


              {/* Progress */}
              <div className="space-y-2">

                <p className="text-sm text-richblack-200">
                  Progress: {course.progressPercentage || 0}%
                </p>

                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />

              </div>

            </div>
          ))
        }

      </div>
    </div>
  );
}