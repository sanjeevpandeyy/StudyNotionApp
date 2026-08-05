import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId);

      dispatch(
        setCourseSectionData(courseData.courseDetails.courseContent)
      );

      dispatch(
        setEntireCourseData(courseData.courseDetails)
      );

      dispatch(
        setCompletedLectures(courseData.completedVideos)
      );

      let lectures = 0;

      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section.subSection?.length || 0;
      });

      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseSpecificDetails();
  }, [courseId, dispatch]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">

        {/* Sidebar */}
        <VideoDetailsSidebar
          setReviewModal={setReviewModal}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Mobile & Tablet Header */}
          <div className="sticky top-0 z-20 flex items-center gap-4 border-b border-richblack-700 bg-richblack-900 px-4 py-3 lg:hidden">

            <button
             onClick={() => setIsSidebarOpen(true)}
              className="rounded-md p-2 hover:bg-richblack-700 transition-all"
            >
              <HiOutlineMenuAlt2 size={24} />
            </button>

            <h2 className="text-lg font-semibold text-richblack-5">
              Course Content
            </h2>

          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-6">
            <Outlet />
          </div>

        </div>
      </div>

      {reviewModal && (
        <CourseReviewModal
          setReviewModal={setReviewModal}
        />
      )}
    </>
  );
};

export default ViewCourse;