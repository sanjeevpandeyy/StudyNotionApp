import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({
  setReviewModal,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");


  const navigate = useNavigate();
  const location = useLocation();

  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex]?.subSection.findIndex(
        (lecture) => lecture._id === subSectionId
      );

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(courseSectionData[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    sectionId,
    subSectionId,
  ]);

  return (
    <>
      

      {/* Dark Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-[3.5rem] z-50
          h-[calc(100vh-3.5rem)] flex flex-col
          w-[300px]
          bg-richblack-800
          border-r border-richblack-700
          transition-transform duration-300
          overflow-hidden

          ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }

          lg:static
          lg:h-[calc(100vh-3.5rem)]
          lg:w-[320px]
          lg:max-w-[350px]
          lg:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-richblack-700 p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-richblack-5">
            Course Content
          </h2>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-2 hover:bg-richblack-700"
          >
            <IoClose size={24} />
          </button>
        </div>
                {/* Header */}
                <div className="mx-5 flex flex-col items-start justify-between gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            {/* Back */}
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
                setIsSidebarOpen(false);
              }}
              className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 transition-all hover:scale-95"
              title="Back"
            >
              <IoIosArrowBack size={24} />
            </div>

            {/* Review Button */}
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => {
                setReviewModal(true);
                setIsSidebarOpen(false);
              }}
            />
          </div>

          <div className="flex flex-col">
            <p className="line-clamp-2">
              {courseEntireData?.courseName}
            </p>

            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto pb-6">
          {courseSectionData?.map((course) => (
            <div
              key={course._id}
              className="mt-2 text-sm text-richblack-5"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() =>
                  setActiveStatus(
                    activeStatus === course._id ? "" : course._id
                  )
                }
                className="flex w-full items-center justify-between bg-richblack-600 px-5 py-4 text-left hover:bg-richblack-500 transition-all"
              >
                <span className="w-[75%] font-semibold">
                  {course.sectionName}
                </span>

                <span
                  className={`transition-transform duration-300 ${
                    activeStatus === course._id
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  <BsChevronDown />
                </span>
              </button>

              {/* Lectures */}
              {activeStatus === course._id && (
                <div className="overflow-hidden transition-all duration-300">
                  {course.subSection.map((topic) => (
                    <button
                      key={topic._id}
                      type="button"
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                        );

                        setVideoBarActive(topic._id);

                        // Close drawer on mobile
                        setIsSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-all ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-900"
                          : "hover:bg-richblack-900"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic._id)}
                        readOnly
                      />

                      <span className="line-clamp-2">
                        {topic.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        </aside>
    </>
  );
}