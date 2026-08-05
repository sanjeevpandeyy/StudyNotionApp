import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import InstructorChart from "./InstructorChart";


export default function InstructorDashboard() {

  const { token } = useSelector((state)=>state.auth);
  const { user } = useSelector((state)=>state.profile);


  const [loading,setLoading]=useState(false);
  const [instructorData,setInstructorData]=useState([]);
  const [courses,setCourses]=useState([]);



  useEffect(()=>{

    const fetchData=async()=>{

      try{

        setLoading(true);

        const instructorApiData =
          await getInstructorData();

        const courseData =
          await fetchInstructorCourses();


        if(instructorApiData){
          setInstructorData(instructorApiData);
        }


        if(courseData){
          setCourses(courseData);
        }


      }
      catch(error){

        console.log(
          "INSTRUCTOR DASHBOARD ERROR",
          error
        );

      }
      finally{

        setLoading(false);

      }

    };


    fetchData();


  },[token]);




  const totalAmount =
    instructorData?.reduce(
      (acc,curr)=>
        acc + (curr.totalAmountGenerated || 0),
      0
    ) || 0;



  const totalStudents =
    instructorData?.reduce(
      (acc,curr)=>
        acc + (curr.totalStudentsEnrolled || 0),
      0
    ) || 0;



  if(loading){

    return (

      <div className="
        grid
        h-[70vh]
        place-items-center
      ">

        <div className="spinner"></div>

      </div>

    );

  }



  return (

    <div className="
      space-y-8
      text-richblack-5
    ">



      <div className="space-y-2">

        <h1 className="
          text-2xl
          font-bold
        ">
          Hi {user?.firstName} 👋
        </h1>


        <p className="
          text-richblack-200
        ">
          Let's start something new
        </p>

      </div>




      {
        courses.length > 0 ?


        (

          <>



            {/* Chart + Stats */}

            <div className="
              flex
              flex-col
              gap-6
              xl:flex-row
            ">


              <div className="
                flex-1
                rounded-xl
              ">


                {
                  totalAmount || totalStudents ?

                  <InstructorChart
                    courses={instructorData}
                  />

                  :

                  <div className="
                    rounded-xl
                    bg-richblack-800
                    p-6
                  ">

                    <p className="text-lg font-bold">
                      Visualize
                    </p>

                    <p className="
                      mt-4
                      text-richblack-300
                    ">
                      Not Enough Data To Visualize
                    </p>

                  </div>

                }


              </div>





              {/* Statistics */}


              <div className="
                w-full
                rounded-xl
                border
                border-richblack-700
                bg-richblack-800
                p-6
                xl:w-[320px]
              ">


                <p className="
                  text-center
                  text-lg
                  font-bold
                ">
                  Statistics
                </p>



                <div className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-6
                ">



                  <div className="text-center">

                    <p className="text-richblack-300">
                      Total Courses
                    </p>

                    <p className="text-3xl font-semibold">
                      {courses.length}
                    </p>

                  </div>




                  <div className="text-center">

                    <p className="text-richblack-300">
                      Total Students
                    </p>

                    <p className="text-3xl font-semibold">
                      {totalStudents}
                    </p>

                  </div>





                  <div className="text-center">

                    <p className="text-richblack-300">
                      Total Income
                    </p>

                    <p className="text-3xl font-semibold">
                      ₹ {totalAmount}
                    </p>

                  </div>


                </div>


              </div>


            </div>





            {/* Courses */}


            <div className="
              rounded-xl
              border
              border-richblack-700
              bg-richblack-800
              p-6
            ">


              <div className="
                flex
                items-center
                justify-between
              ">


                <p className="
                  text-lg
                  font-bold
                ">
                  Your Courses
                </p>



                <Link
                  to="/dashboard/my-courses"
                  className="
                    text-sm
                    font-semibold
                    text-yellow-50
                  "
                >
                  View All
                </Link>


              </div>





              <div className="
                mt-6
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-3
              ">


                {
                  courses.slice(0,3).map((course)=>(

                    <div
                      key={course._id}
                      className="
                        overflow-hidden
                        rounded-xl
                        bg-richblack-700
                      "
                    >


                      <img

                        src={course.thumbnail}

                        alt={course.courseName}

                        className="
                          h-44
                          w-full
                          object-cover
                        "

                      />



                      <div className="p-4">


                        <p className="
                          font-semibold
                        ">
                          {course.courseName}
                        </p>



                        <div className="
                          mt-2
                          flex
                          gap-2
                          text-sm
                          text-richblack-300
                        ">

                          <span>
                            {course.studentsEnroled?.length || 0}
                            {" "}students
                          </span>

                          <span>
                            |
                          </span>


                          <span>
                            ₹ {course.price}
                          </span>


                        </div>


                      </div>


                    </div>

                  ))
                }


              </div>


            </div>


          </>


        )


        :


        (

          <div className="
            mt-20
            rounded-xl
            bg-richblack-800
            p-10
            text-center
          ">


            <p className="
              text-2xl
              font-bold
            ">
              You have not created any courses yet
            </p>


            <Link
              to="/dashboard/add-course"
              className="
                mt-3
                inline-block
                font-semibold
                text-yellow-50
              "
            >

              Create a course

            </Link>


          </div>

        )

      }


    </div>

  );

}