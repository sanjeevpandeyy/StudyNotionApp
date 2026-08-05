import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)

        const result = await fetchInstructorCourses(token)

        if (result) {
          setCourses(result)
        }
      } catch (error) {
        console.log("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [token])

  return (
    <div className="space-y-8">

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>
          <h1 className="
            text-3xl
            font-semibold
            text-richblack-5
          ">
            My Courses
          </h1>

          <p className="
            mt-2
            text-sm
            text-richblack-300
          ">
            Manage your created courses and track their performance.
          </p>
        </div>


        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>

      </div>


      {
        loading ? (

          <div className="
            flex
            h-[40vh]
            items-center
            justify-center
          ">

            <div className="spinner"></div>

          </div>

        ) : courses.length > 0 ? (

          <div className="
            overflow-hidden
            rounded-xl
            border
            border-richblack-700
            bg-richblack-800
            p-4
            sm:p-6
          ">

            <CoursesTable
              courses={courses}
              setCourses={setCourses}
            />

          </div>

        ) : (

          <div className="
            flex
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-richblack-700
            bg-richblack-800
            px-6
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
              Start creating your first course.
            </p>

            <button
              onClick={() => navigate("/dashboard/add-course")}
              className="
                mt-6
                rounded-md
                bg-yellow-50
                px-5
                py-2
                font-semibold
                text-richblack-900
                transition-all
                hover:scale-95
              "
            >
              Create Course
            </button>

          </div>

        )
      }

    </div>
  )
}