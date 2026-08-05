import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import {
  markLectureAsComplete,
} from "../../../services/operations/courseDetailsAPI";

import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const videoRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    if (!courseSectionData.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const currentSection = courseSectionData.find(
      (section) => section._id === sectionId
    );
    
    
    // If current section has no lectures, go to the first section that has lectures
    if (!currentSection.subSection || currentSection.subSection.length === 0) {
      const firstSectionWithLecture = courseSectionData.find(
        (section) => section.subSection?.length > 0
      );
    
      if (!firstSectionWithLecture) {
        toast.error("This course doesn't have any lectures yet.");
        navigate("/dashboard/enrolled-courses");
        return;
      }
      
      navigate(
        `/view-course/${courseId}/section/${firstSectionWithLecture._id}/sub-section/${firstSectionWithLecture.subSection[0]._id}`
      );
      
      return;
    }


    const currentVideo = currentSection.subSection.find(
      (subSection) => subSection._id === subSectionId
    );
    
    if (!currentVideo) {
      navigate(
        `/view-course/${courseId}/section/${currentSection._id}/sub-section/${currentSection.subSection[0]._id}`
      );
      return;
    }
    
    setVideoData(currentVideo||null);
    setPreviewSource(courseEntireData?.thumbnail || "");
    setVideoEnded(false);
    setShowPlayButton(true);

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [
    courseId,
    sectionId,
    subSectionId,
    courseSectionData,
    courseEntireData,
    location.pathname,
    navigate,
  ]);

  // Check if current lecture is first lecture
  const isFirstVideo = () => {
    for (const section of courseSectionData) {
      if (section.subSection?.length > 0) {
        return (
          section._id === sectionId &&
          section.subSection[0]._id === subSectionId
        );
      }
    }
  
    return true;
  };


  // Check has any next lecture
  const hasNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
  
    if (currentSectionIndex === -1) return false;
  
    const currentSection = courseSectionData[currentSectionIndex];
  
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );
  
    // Next lecture in current section
    if (currentSubSectionIndex < currentSection.subSection.length - 1) {
      return true;
    }
  
    // Search remaining sections
    for (let i = currentSectionIndex + 1; i < courseSectionData.length; i++) {
      if (courseSectionData[i].subSection?.length > 0) {
        return true;
      }
    }
  
    return false;
  };
    // Go to next lecture
    const goToNextVideo = () => {
      const currentSectionIndx = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
    
      if (currentSectionIndx === -1) return;
    
      const currentSection = courseSectionData[currentSectionIndx];
    
      const currentSubSectionIndx = currentSection.subSection.findIndex(
        (sub) => sub._id === subSectionId
      );
    
      // Next lecture in the same section
      if (currentSubSectionIndx < currentSection.subSection.length - 1) {
        const nextSubSectionId =
          currentSection.subSection[currentSubSectionIndx + 1]._id;
    
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
        );
        return;
      }
    
      // Find the next section that contains at least one lecture
      let nextSectionIndx = currentSectionIndx + 1;
    
      while (
        nextSectionIndx < courseSectionData.length &&
        (!courseSectionData[nextSectionIndx].subSection ||
          courseSectionData[nextSectionIndx].subSection.length === 0)
      ) {
        nextSectionIndx++;
      }
    
      // No more lectures available
      if (nextSectionIndx >= courseSectionData.length) {
        return;
      }
    
      const nextSection = courseSectionData[nextSectionIndx];
    
      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      );
    };

  
    // Go to previous lecture
  const goToPrevVideo = () => {
  const currentSectionIndx = courseSectionData.findIndex(
    (section) => section._id === sectionId
  );

  if (currentSectionIndx === -1) return;

  const currentSection = courseSectionData[currentSectionIndx];

  const currentSubSectionIndx = currentSection.subSection.findIndex(
    (sub) => sub._id === subSectionId
  );

  // Previous lecture in the same section
  if (currentSubSectionIndx > 0) {
    const prevSubSectionId =
      currentSection.subSection[currentSubSectionIndx - 1]._id;

    navigate(
      `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
    );
    return;
  }

  // Find the previous section that contains at least one lecture
  let prevSectionIndx = currentSectionIndx - 1;

  while (
    prevSectionIndx >= 0 &&
    (!courseSectionData[prevSectionIndx].subSection ||
      courseSectionData[prevSectionIndx].subSection.length === 0)
  ) {
    prevSectionIndx--;
  }

  // No previous lectures available
  if (prevSectionIndx < 0) {
    return;
  }

  const prevSection = courseSectionData[prevSectionIndx];
  const lastSubSection =
    prevSection.subSection[prevSection.subSection.length - 1];

  navigate(
    `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSubSection._id}`
  );
};


  
    // Mark lecture as completed
    const handleLectureCompletion = async () => {
      setLoading(true);
  
      const response = await markLectureAsComplete(
        {
          courseId,
          subsectionId: subSectionId,
        },
        token
      );
  
      if (response) {
        dispatch(updateCompletedLectures(subSectionId));
      }
  
      setLoading(false);
    };




  
    return (
      <div className="flex flex-col gap-5 text-white pt-4">
        {!videoData ? (
          <img
            src={previewSource || null}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={videoData?.videoUrl}
            controls
            className="h-full w-full rounded-md bg-black"
            onPlay={() => setShowPlayButton(false)}
            onEnded={() => setVideoEnded(true)}
            
          
          />
          {showPlayButton && (
  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
    <button
      onClick={() => {
        videoRef.current.play();
        setShowPlayButton(false);
      }}
      className="group flex h-24 w-24 items-center justify-center rounded-full
      border-[5px]
                 border border-yellow-100/50
                 bg-richblack-400/20
                 backdrop-blur-md
                 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                 transition-all duration-300
                 hover:scale-105 hover:bg-richblack-700/30
                 active:scale-95 
                 -translate-y-[30px]
                  -translate-x-[20px]
                 "
                 
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="richblack-900"
        className="ml-1 h-14 w-14 transition-transform duration-300 group-hover:scale-105 -translate-x-[2px]"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
)}

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[10] flex flex-col items-center justify-center "
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={
                    !loading
                      ? "Mark As Completed"
                      : "Loading..."
                  }
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-3"
              />

              <div className="mt-10 flex gap-4">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}

                {hasNextVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">
        {videoData?.title}
      </h1>

      <p className="pb-6 pt-2">
        {videoData?.description}
      </p>
    </div>
  );
};

export default VideoDetails;
