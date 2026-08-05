import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStarsPackage from "react-rating-stars-component/dist/react-stars"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import { errorToast } from "../../../common/costomToast"


const ReactStars = ReactStarsPackage.default


export default function RenderCartCourses(){

  const {cart}=useSelector((state)=>state.cart)

  const dispatch=useDispatch()


  return (

    <div className="
      flex
      w-full
      flex-col
      gap-6
    ">


      {
        cart.map((course,index)=>(


          <div
            key={course._id}
            className={`
              flex
              flex-col
              gap-5
              rounded-xl
              border
              border-richblack-700
              bg-richblack-800
              p-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            `}
          >


            <div className="
              flex
              flex-col
              gap-4
              sm:flex-row
            ">


              <img

                loading="lazy"

                src={course.thumbnail}

                alt={course.courseName}

                className="
                  h-40
                  w-full
                  rounded-lg
                  object-cover
                  sm:h-28
                  sm:w-44
                "

              />


              <div className="
                flex
                flex-col
                gap-2
              ">


                <p className="
                  text-lg
                  font-semibold
                  text-richblack-5
                ">
                  {course.courseName}
                </p>


                <p className="
                  text-sm
                  text-richblack-300
                ">
                  {course.category?.name}
                </p>


                <div className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                ">

                  <span className="text-yellow-5">
                    4.5
                  </span>


                  <ReactStars

                    count={5}

                    value={
                      course.ratingAndReviews?.length || 0
                    }

                    size={18}

                    edit={false}

                    activeColor="#ffd700"

                    emptyIcon={<FaStar/>}

                    fullIcon={<FaStar/>}

                  />


                  <span className="text-xs text-richblack-400">
                    {course.ratingAndReviews?.length || 0} Ratings
                  </span>


                </div>


              </div>


            </div>



            <div className="
              flex
              items-center
              justify-between
              sm:flex-col
              sm:items-end
            ">


              <button

                onClick={()=>{

                  dispatch(removeFromCart(course._id))

                  errorToast("Course removed from cart")

                }}

                className="
                  flex
                  items-center
                  gap-2
                  rounded-md
                  border
                  border-richblack-600
                  bg-richblack-700
                  px-3
                  py-2
                  text-sm
                  text-pink-200
                "

              >

                <RiDeleteBin6Line/>

                Remove

              </button>



              <p className="
                text-2xl
                font-semibold
                text-yellow-100
              ">

                ₹ {course.price}

              </p>


            </div>


          </div>


        ))

      }


    </div>

  )

}