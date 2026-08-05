import React, { useEffect, useState ,useRef } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating.jsx";
import Error from "./Error";



function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState([]);

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
  
    fetched.current = true;
  
    (async () => {
      const res = await fetchCourseDetails(courseId);
      setResponse(res);
    })();
  }, [courseId]);
  
  
  const course = response?.data?.courseDetails || {};


  useEffect(() => {
    setAvgReviewCount(
      GetAvgRating(course.ratingAndReviews || [])
    );
  }, [course]);


  useEffect(() => {
    let lectures = 0;

    course.courseContent?.forEach((section) => {
      lectures += section?.subSection?.length || 0;
    });

    setTotalNoOfLectures(lectures);
  }, [course]);

  if (loading || !response) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success) {
    return <Error />;
  }

  const {
    courseName = "",
    courseDescription = "",
    whatYouWillLearn = "",
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    studentEnrolled = [],
    publishedAt,
  } = course;

  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  
  const handleBuyCourse = () => {
    if (token) {
      buyCourse([courseId], user, navigate, dispatch);
      return;
    }
    
    

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };


  if (paymentLoading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px]">

          <div className="  grid min-h-[450px] max-w-maxContentTab py-8 xl:max-w-[600px]">

            
            <div className="my-5 flex flex-col gap-4 text-richblack-5">

              <h1 className="text-4xl font-bold">
                {courseName}
              </h1>

              <p>{courseDescription}</p>

              <div className="flex flex-wrap gap-2">

                <span className="text-yellow-25">
                  {avgReviewCount}
                </span>

                <RatingStars
                  Review_Count={avgReviewCount}
                  Star_Size={24}
                />

                <span>
                  ({ratingAndReviews.length} Reviews)
                </span>

                <span>
                  {studentEnrolled.length} Students Enrolled
                </span>
                
              </div>

              <p>
                Created By {instructor.firstName} {instructor.lastName ? instructor.lastName:""}
              </p>

              <div className="flex gap-6">

                <p className="flex items-center gap-2">
                  <BiInfoCircle />
                  {formatDate(publishedAt)}
                </p>

                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt />
                  English
                </p>

              </div>

            </div>

          </div>


          <div className=" lg:absolute right-5 top-16 w-[400px] mx-auto ">

            <CourseDetailsCard
              course={course}
              handleBuyCourse={handleBuyCourse}
              setConfirmationModal={setConfirmationModal}
            />

          </div>

        </div>
      </div>


      <div className="mx-auto box-content px-4 lg:w-[1260px] text-richblack-25">

        <div className="xl:max-w-[810px]">

          <div className="my-8 border border-richblack-700 p-8  ml-4">

            <h2 className="text-3xl font-semibold ">
              What you'll learn
            </h2>

            <ReactMarkdown>
              {whatYouWillLearn}
            </ReactMarkdown>

          </div>

          <div>

            <h2 className="text-3xl font-semibold mb-3">
              Course Content
            </h2>

            <div className="flex gap-4 flex-wrap">

              <span>{courseContent.length} Sections</span>

              <span>{totalNoOfLectures} Lectures</span>

              <span>
                {response?.data?.totalDuration}
              </span>

            </div>

            <button
              className="text-yellow-50 my-4"
              onClick={() => setIsActive([])}
            >
              Collapse all sections
            </button>

            {courseContent.map((section) => (
              <CourseAccordionBar
                key={section._id}
                course={section}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}

          </div>

          <div className="my-10">

            <h2 className="text-3xl font-semibold">
              Author
            </h2>

            <div className="flex items-center gap-4 my-4">

              <img
                loading="lazy"
                className="h-14 w-14 rounded-full"
                src={
                  instructor.image ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt=""
              />

              <h3 className="text-xl">
                {instructor.firstName} {instructor.lastName}
              </h3>

            </div>

            <p>
              {instructor.additionalDetails?.about}
            </p>

          </div>

        </div>

      </div>

      <Footer />

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}

export default CourseDetails;