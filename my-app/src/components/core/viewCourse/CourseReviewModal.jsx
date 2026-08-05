import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import ReactStarsModule from "react-stars"
const ReactStars = ReactStarsModule.default
import { createRating,getUserReview } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import { useEffect, useState } from "react";



export default function CourseReviewModal({ setReviewModal }) {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({

    defaultValues: {
      courseExperience: "",
      courseRating: 0,
    },
  })
  const rating = watch("courseRating")
  const ratingChanged = (newRating) => {
    setValue(
      "courseRating",
      newRating,
      {
        shouldValidate: true
      }
    )
  }
  const onSubmit = async (data) => {
    if(data.courseRating === 0){
      toast.error("Please select rating")
      return
    }
    try {
      setLoading(true)
      await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      )
      toast.success("Review added successfully")
      setReviewModal(false)
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {

    const fetchReview = async()=>{
  
      const response = await getUserReview(
        courseEntireData._id
      )
  
  
      if(response?.success && response?.review){
  
        setIsUpdate(true)
  
  
        setValue(
          "courseRating",
          response.review.rating
        )
  
  
        setValue(
          "courseExperience",
          response.review.review
        )
  
      }
  
    }
  
  
    fetchReview()
  
  
  }, [])

  return (
    <div className="
      fixed inset-0 z-[1000]
      grid h-screen w-screen
      place-items-center
      overflow-auto
      bg-black/40
      backdrop-blur-sm
    ">
      <div className="
        my-10 w-11/12 max-w-[600px]
        
        rounded-md
        border border-richblack-700
        bg-richblack-800
        shadow-xl
      ">
        {/* Header */}

        <div className="
          flex items-center justify-between
          rounded-t-lg bg-richblack-700 p-6 py-4
        ">

          <p className="
            text-xl font-semibold text-richblack-5
          ">
            Add Review
          </p>
          <button
            type="button"
            onClick={() => setReviewModal(false)}
          >
            <RxCross2 className="
              text-2xl text-richblack-5
            "/>
          </button>
        </div>
        {/* Body */}

        <div className="p-6">
          <div className="
            flex items-center justify-center gap-x-4
          ">
            <img
              src={
                user?.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`
              }
              alt="profile"
              className="
                aspect-square w-[50px]
                rounded-full object-cover
              "
            />
            <div>
              <p className="
                font-semibold text-richblack-5
              ">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="
                text-sm text-richblack-5
              ">
                Posting Publicly
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
              mt-4 flex flex-col items-center
            "
          >
            {/* Stars */}
            
              <ReactStars
                count={5}
                value={watch("courseRating")}
                size={30}
                color1="#ccc"
                color2="#ffd700"
                onChange={ratingChanged}
              />
            {/* Review */}
            <div className="
               flex w-11/12 flex-col space-y-2
            ">
              <label
                htmlFor="courseExperience"
                className="
                  text-sm text-richblack-5
                "
              >
                Add Your Experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register(
                  "courseExperience",
                )}
                className="
                  form-style
                  min-h-[100px]
                  w-full
                  resize-none
                "
              />
              {
                errors.courseExperience && (
                  <span className="
                    ml-2 text-xs
                    tracking-wide text-pink-200
                  ">
                    Please Add Your Experience
                  </span>
                )
              }
            </div>
            <div className="
              mt-6 flex w-11/12
              justify-end gap-x-2
            ">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="
                  rounded-md bg-richblack-300
                  px-[20px] py-[8px]
                  font-semibold text-richblack-900
                "
              >
                Cancel
              </button>
              <IconBtn
                  text={
                    isUpdate
                    ? "Update Review"
                    : "Save"
                  }
                />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}