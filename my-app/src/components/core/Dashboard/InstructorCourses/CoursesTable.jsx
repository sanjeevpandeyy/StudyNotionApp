import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaCheck } from "react-icons/fa"
import { HiClock } from "react-icons/hi"

import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { formatDate } from "../../../../services/formatDate"
import { COURSE_STATUS } from "../../../../utils/constants"

import ConfirmationModal from "../../../common/ConfirmationModal"


export default function CoursesTable({courses,setCourses}){

  const navigate = useNavigate()

  const {token}=useSelector((state)=>state.auth)

  const [loading,setLoading]=useState(false)
  const [confirmationModal,setConfirmationModal]=useState(null)


  const handleDelete=async(courseId)=>{

    setLoading(true)

    await deleteCourse(
      {courseId},
      token
    )

    const result=await fetchInstructorCourses(token)

    if(result){
      setCourses(result)
    }

    setLoading(false)
    setConfirmationModal(null)
  }



  const Status=({status})=>{

    const config={

      [COURSE_STATUS.DRAFT]:{
        text:"Draft",
        icon:<HiClock/>,
        style:"text-pink-200"
      },

      [COURSE_STATUS.PENDING_APPROVAL]:{
        text:"Pending",
        icon:<HiClock/>,
        style:"text-yellow-50"
      },

      [COURSE_STATUS.PUBLISHED]:{
        text:"Published",
        icon:<FaCheck/>,
        style:"text-caribbeangreen-200"
      },

      [COURSE_STATUS.REJECTED]:{
        text:"Rejected",
        icon:null,
        style:"text-red-200"
      }

    }


    const item=config[status]

    if(!item) return null


    return(
      <div className={`
        flex
        items-center
        gap-2
        rounded-full
        bg-richblack-700
        px-3
        py-1
        text-xs
        font-medium
        ${item.style}
      `}>
        {item.icon}
        {item.text}
      </div>
    )
  }



  if(!courses?.length){

    return(
      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        py-16
        text-center
      ">
        <p className="
          text-2xl
          font-semibold
          text-richblack-5
        ">
          No Courses Found
        </p>

        <p className="
          mt-2
          text-richblack-300
        ">
          Create your first course to see it here.
        </p>
      </div>
    )
  }



  return(
    <>

    <div className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-3
    ">


    {
      courses.map((course)=>(

        <div
          key={course._id}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-richblack-700
            bg-richblack-800
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >

          <div className="
            relative
          ">

            <img

              src={course.thumbnail}

              alt={course.courseName}

              className="
                h-48
                w-full
                object-cover
              "

            />


            <div className="
              absolute
              bottom-3
              left-3
            ">
              <Status status={course.status}/>
            </div>


          </div>




          <div className="
            flex
            flex-col
            gap-3
            p-5
          ">


            <h2 className="
              line-clamp-1
              text-lg
              font-semibold
              text-richblack-5
            ">
              {course.courseName}
            </h2>



            <p className="
              line-clamp-2
              text-sm
              text-richblack-300
            ">
              {course.courseDescription}
            </p>



            <div className="
              flex
              justify-between
              text-sm
            ">

              <span className="text-richblack-400">
                Created
              </span>

              <span className="text-richblack-100">
                {formatDate(course.createdAt)}
              </span>

            </div>



            <div className="
              flex
              items-center
              justify-between
              border-t
              border-richblack-700
              pt-4
            ">

              <p className="
                text-xl
                font-bold
                text-yellow-50
              ">
                ₹{course.price}
              </p>



              <div className="
                flex
                gap-2
              ">


                <button
                  disabled={loading}
                  onClick={()=>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                  className="
                    rounded-lg
                    bg-richblack-700
                    p-3
                    text-yellow-50
                    hover:bg-richblack-600
                  "
                >
                  <FiEdit2/>
                </button>



                <button

                  disabled={loading}

                  onClick={()=>setConfirmationModal({

                    text1:"Delete Course?",

                    text2:"All course data will be permanently removed.",

                    btn1Text:"Delete",

                    btn2Text:"Cancel",

                    btn1Handler:()=>handleDelete(course._id),

                    btn2Handler:()=>setConfirmationModal(null)

                  })}

                  className="
                    rounded-lg
                    bg-richblack-700
                    p-3
                    text-pink-200
                    hover:bg-richblack-600
                  "

                >
                  <RiDeleteBin6Line/>
                </button>


              </div>


            </div>


          </div>


        </div>

      ))
    }


    </div>


    {
      confirmationModal &&
      <ConfirmationModal
        modalData={confirmationModal}
      />
    }


    </>
  )
}
