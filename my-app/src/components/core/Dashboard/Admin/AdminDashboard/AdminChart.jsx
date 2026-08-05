import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function AdminChart({ analytics }) {


  const data = [
    {
      name: "Users",
      value: analytics?.totalUsers || 0,
    },

    {
      name: "Students",
      value: analytics?.totalStudents || 0,
    },

    {
      name: "Instructors",
      value: analytics?.totalInstructors || 0,
    },

    {
      name: "Courses",
      value: analytics?.totalCourses || 0,
    },

    {
      name: "Published",
      value: analytics?.publishedCourses || 0,
    },

    {
      name: "Pending",
      value: analytics?.pendingCourses || 0,
    },

    {
      name: "Enrollments",
      value: analytics?.totalEnrollments || 0,
    },
  ];



  return (

    <div className="mt-10 rounded-xl border border-richblack-700 bg-richblack-800 p-6">


      <h2 className="mb-6 text-xl font-semibold text-richblack-5">
        Platform Overview
      </h2>



      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>


          <CartesianGrid
            strokeDasharray="3 3"
          />


          <XAxis
            dataKey="name"
            tick={{fill:"#AFB2BF"}}
          />


          <YAxis
            tick={{fill:"#AFB2BF"}}
          />


          <Tooltip />


          <Bar
            dataKey="value"
            fill="#FFD60A"
            radius={[8,8,0,0]}
          />


        </BarChart>


      </ResponsiveContainer>


    </div>

  );

}