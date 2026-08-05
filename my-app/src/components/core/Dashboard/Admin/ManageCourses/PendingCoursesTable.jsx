import { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  approveCourse,
  rejectCourse,
} from "../../../../../services/operations/courseDetailsAPI";

import CourseActionModal from "./CourseActionModal";


export default function PendingCoursesTable({
  courses,
  refreshCourses,
}) {

  const [loading,setLoading]=useState(false);
  const [confirmationModal,setConfirmationModal]=useState(null);



  const handleApprove = async(courseId)=>{

    setLoading(true);

    const result = await approveCourse(courseId);

    if(result){
      refreshCourses();
    }

    setLoading(false);

  };



  const handleReject = async(courseId,rejectionReason)=>{

    setLoading(true);

    const result = await rejectCourse(
      courseId,
      rejectionReason
    );

    if(result){
      refreshCourses();
    }

    setConfirmationModal(null);
    setLoading(false);

  };



  return (
    <>


      {/* Desktop Table */}

      <div className="hidden min-[800px]:block overflow-x-auto">

        <Table className="
          w-full
          rounded-xl
          border
          border-richblack-700
        ">

          <Thead>

            <Tr className="
              flex
              items-center
              justify-between
              border-b
              border-richblack-700
              px-6
              py-4
            ">

              <Th className="flex-1 text-left text-sm text-richblack-200">
                Course
              </Th>

              <Th className="text-left text-sm text-richblack-200">
                Instructor
              </Th>

              <Th className="text-left text-sm text-richblack-200">
                Price
              </Th>

              <Th className="text-left text-sm text-richblack-200">
                Actions
              </Th>

            </Tr>

          </Thead>


          <Tbody>

          {
            courses.length===0 ? (

              <Tr>
                <Td className="py-10 text-center text-xl text-richblack-200">
                  No Pending Courses
                </Td>
              </Tr>

            ) : (

              courses.map(course=>(

                <Tr
                  key={course._id}
                  className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-richblack-700
                  px-6
                  py-5
                  "
                >

                  <Td className="flex flex-1 items-center gap-4">

                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="
                      h-16
                      w-24
                      rounded-lg
                      object-cover
                      "
                    />

                    <div>

                      <p className="font-semibold text-richblack-5">
                        {course.courseName}
                      </p>

                      <p className="text-sm text-richblack-300">
                        {course.category?.name}
                      </p>

                    </div>

                  </Td>


                  <Td className="text-sm text-richblack-100">

                    {course.instructor?.firstName}
                    {" "}
                    {course.instructor?.lastName}

                  </Td>


                  <Td className="text-sm text-richblack-100">
                    ₹{course.price}
                  </Td>



                  <Td>

                    <div className="flex gap-2">

                      <button
                        disabled={loading}
                        onClick={()=>handleApprove(course._id)}
                        className="
                        rounded-lg
                        bg-caribbeangreen-200
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-richblack-900
                        "
                      >
                        <FaCheck/>
                      </button>


                      <button
                        disabled={loading}
                        onClick={()=>setConfirmationModal({
                          courseId:course._id
                        })}
                        className="
                        rounded-lg
                        bg-pink-200
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-richblack-900
                        "
                      >
                        <RxCross2/>
                      </button>

                    </div>

                  </Td>


                </Tr>

              ))

            )
          }

          </Tbody>

        </Table>

      </div>





      {/* Mobile + Tablet Cards */}

      <div className="space-y-4 min-[800px]:hidden">

      {
        courses.length===0 ? (

          <div className="py-10 text-center text-xl text-richblack-200">
            No Pending Courses
          </div>

        ) : (

          courses.map(course=>(

            <div
              key={course._id}
              className="
              rounded-2xl
              border
              border-richblack-700
              bg-richblack-900
              p-5
              "
            >


              <div className="flex gap-4">

                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="
                  h-20
                  w-28
                  rounded-xl
                  object-cover
                  "
                />


                <div>

                  <p className="
                    text-lg
                    font-semibold
                    text-richblack-5
                  ">
                    {course.courseName}
                  </p>


                  <p className="text-sm text-richblack-300">
                    {course.category?.name}
                  </p>

                </div>

              </div>



              <div className="
                mt-4
                space-y-2
                text-sm
                text-richblack-200
              ">

                <p>
                  Instructor:
                  <span className="text-richblack-5 ml-2">
                    {course.instructor?.firstName}
                    {" "}
                    {course.instructor?.lastName}
                  </span>
                </p>


                <p>
                  Price:
                  <span className="text-yellow-50 ml-2">
                    ₹{course.price}
                  </span>
                </p>

              </div>




              <div className="
                mt-5
                flex
                gap-3
              ">


                <button
                  disabled={loading}
                  onClick={()=>handleApprove(course._id)}
                  className="
                  flex-1
                  rounded-xl
                  bg-caribbeangreen-200
                  py-2
                  font-semibold
                  text-richblack-900
                  "
                >
                  Approve
                </button>



                <button
                  disabled={loading}
                  onClick={()=>setConfirmationModal({
                    courseId:course._id
                  })}
                  className="
                  flex-1
                  rounded-xl
                  bg-pink-200
                  py-2
                  font-semibold
                  text-richblack-900
                  "
                >
                  Reject
                </button>


              </div>


            </div>

          ))

        )
      }

      </div>




      {
        confirmationModal && (

          <CourseActionModal
            modalData={confirmationModal}
            setModalData={setConfirmationModal}
            handleReject={handleReject}
          />

        )
      }


    </>
  );
}
