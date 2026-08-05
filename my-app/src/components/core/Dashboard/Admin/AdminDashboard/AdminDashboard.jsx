import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAdminAnalytics } from "../../../../../services/operations/adminAPI";

import StatsCard from "./StatsCard";
import AdminChart from "./AdminChart";


export default function AdminDashboard() {

  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchAnalytics = async () => {

      setLoading(true);

      const result = await getAdminAnalytics();

      if (result) {
        setAnalytics(result);
      }

      setLoading(false);

    };


    fetchAnalytics();

  }, []);



  const cards = [

    {
      title: "Total Users",
      value: analytics?.totalUsers,
    },

    {
      title: "Students",
      value: analytics?.totalStudents,
    },

    {
      title: "Instructors",
      value: analytics?.totalInstructors,
    },

    {
      title: "Total Courses",
      value: analytics?.totalCourses,
    },

    {
      title: "Published Courses",
      value: analytics?.publishedCourses,
    },

    {
      title: "Pending Approval",
      value: analytics?.pendingCourses,
    },

    {
      title: "Rejected Courses",
      value: analytics?.rejectedCourses,
    },

    {
      title: "Enrollments",
      value: analytics?.totalEnrollments,
    },

    {
      title: "Revenue",
      value: `₹ ${analytics?.totalRevenue || 0}`,
    },

  ];



  const quickActions = [

    {
      title: "Manage Courses",
      description: "Approve, reject and manage all courses",
      path: "/dashboard/admin/courses",
    },

    {
      title: "Manage Users",
      description: "View and manage students and instructors",
      path: "/dashboard/admin/users",
    },

    {
      title: "Manage Categories",
      description: "Create, update and delete categories",
      path: "/dashboard/admin/categories",
    },

  ];



  if(loading){

    return(

      <div className="flex h-[50vh] items-center justify-center">

        <p className="text-xl text-richblack-200">
          Loading Admin Dashboard...
        </p>

      </div>

    );

  }



  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">

        <h1 className="text-3xl font-semibold text-richblack-5">
          Admin Dashboard
        </h1>


        <p className="mt-2 text-richblack-300">
          Manage platform activities and track overall performance.
        </p>

      </div>




      {/* Statistics Cards */}

      <div>

        <h2 className="mb-5 text-xl font-semibold text-richblack-5">
          Platform Overview
        </h2>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {
            cards.map((card,index)=>(

              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
              />

            ))
          }


        </div>


      </div>




      {/* Analytics Chart */}

      <AdminChart
        analytics={analytics}
      />




      {/* Quick Actions */}

      <div>

        <h2 className="mb-5 text-xl font-semibold text-richblack-5">
          Quick Actions
        </h2>



        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


          {
            quickActions.map((action,index)=>(

              <div

                key={index}

                onClick={() => navigate(action.path)}

                className="
                cursor-pointer
                rounded-xl
                border
                border-richblack-700
                bg-richblack-800
                p-5
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-yellow-50
                "

              >

                <h3 className="text-lg font-semibold text-richblack-5">
                  {action.title}
                </h3>


                <p className="mt-2 text-sm text-richblack-300">
                  {action.description}
                </p>


                <p className="mt-4 text-sm font-medium text-yellow-50">
                  Open →
                </p>


              </div>


            ))
          }


        </div>


      </div>


    </div>

  );

}