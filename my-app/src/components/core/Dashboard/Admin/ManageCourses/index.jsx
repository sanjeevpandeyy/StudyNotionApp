import { useEffect, useState } from "react";

import {
  getPendingCourses,
} from "../../../../../services/operations/courseDetailsAPI";

import PendingCoursesTable from "./PendingCoursesTable";


export default function ManageCourses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchPendingCourses = async () => {

    setLoading(true);

    const result = await getPendingCourses();

    if (result) {
      setCourses(result);
    }

    setLoading(false);

  };



  useEffect(() => {

    fetchPendingCourses();

  }, []);



  if (loading) {

    return (

      <div className="
        flex
        h-[50vh]
        items-center
        justify-center
      ">

        <p className="
          text-xl
          text-richblack-200
        ">
          Loading Pending Courses...
        </p>

      </div>

    );

  }



  return (

    <div className="space-y-6">


      {/* Page Header */}

      <div>

        <h1 className="
          text-2xl
          sm:text-3xl
          font-semibold
          text-richblack-5
        ">
          Manage Courses
        </h1>


        <p className="
          mt-2
          text-sm
          sm:text-base
          text-richblack-300
        ">
          Review instructor courses and approve or reject them.
        </p>


      </div>




      {/* Course Section */}

      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-3
        sm:p-6
      ">


        <div className="
          mb-5
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">


          <h2 className="
            text-lg
            sm:text-xl
            font-semibold
            text-richblack-5
          ">
            Pending Approval Courses
          </h2>




          <span className="
            w-fit
            rounded-full
            bg-yellow-900
            px-4
            py-1.5
            text-sm
            font-medium
            text-yellow-100
          ">

            {courses.length} Pending

          </span>


        </div>




        <PendingCoursesTable

          courses={courses}

          setCourses={setCourses}

          refreshCourses={fetchPendingCourses}

        />


      </div>


    </div>

  );

}