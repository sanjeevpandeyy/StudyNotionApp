import React from "react";
import copy from "copy-to-clipboard";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { successToast, errorToast } from "../../common/costomToast";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course;


  const handleShare = () => {
    copy(window.location.href);
    successToast("Link copied to clipboard");
  };


  const handleAddToCart = () => {

    const alreadyAdded = cart.some(
      (item) => item._id === course._id
    );

    if (alreadyAdded) {
      errorToast("Course already in cart");
      return;
    }

    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      errorToast("You are an Instructor. You can't buy a course.");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      successToast("Course added to cart");
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };


  return (
    <div
      className="
      flex 
      flex-col 
      gap-4 
      rounded-md 
      bg-richblack-700 
      p-3 sm:p-4
      text-richblack-5 
      -mt-20
      sm:-mt-30
      mb-4 
      lg:mt-0 
      lg:mb-0 
      lg:mr-16
      "
    >

      {/* Course Image */}

      <img
        loading="lazy"
        src={ThumbnailImage}
        alt={course?.courseName}
        className="
        h-[200px]
        sm:h-[210px]
        w-full
        sm:w-[320px]
        mx-auto
        overflow-hidden
        rounded-2xl
        object-cover
        "
      />


      <div className="px-2 sm:px-4">

        <div className="pb-4 text-2xl sm:text-3xl font-semibold">
          Rs. {CurrentPrice}
        </div>


        <div className="flex flex-col gap-4">

          <button
            className="yellowButton w-full"
            onClick={
              user && course?.studentEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {
              user && course?.studentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"
            }
          </button>


          {
            (!user || !course?.studentEnrolled.includes(user?._id)) && (

              <button
                onClick={handleAddToCart}
                className="blackButton w-full"
              >
                Add to Cart
              </button>

            )
          }

        </div>



        <div>

          <p className="pb-3 pt-5 sm:pt-6 text-center text-xs sm:text-sm text-richblack-25">
            30-Day Money-Back Guarantee
          </p>

        </div>



        <div>

          <p className="my-2 text-lg sm:text-xl font-semibold">
            This Course Includes :
          </p>


          <div className="flex flex-col gap-3 text-xs sm:text-sm text-caribbeangreen-100">

            {
              course?.instructions?.map((item, i) => {

                return (

                  <p className="flex gap-2" key={i}>

                    <BsFillCaretRightFill />

                    <span>{item}</span>

                  </p>

                );

              })
            }

          </div>

        </div>



        <div className="text-center">

          <button
            className="mx-auto flex items-center gap-2 py-5 sm:py-6 text-yellow-100"
            onClick={handleShare}
          >
            <FaShareSquare size={15} />
            Share
          </button>

        </div>


      </div>

    </div>
  );
}

export default CourseDetailsCard;