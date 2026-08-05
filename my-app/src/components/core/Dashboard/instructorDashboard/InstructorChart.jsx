import { useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);


export default function InstructorChart({ courses = [] }) {

  const [currChart, setCurrChart] = useState("students");


  const colors = useMemo(() => {

    return courses.map(
      (_, index) =>
        `hsl(${index * 60}, 70%, 55%)`
    );

  }, [courses]);



  const chartDataStudents = {

    labels: courses.map(
      (course)=>course.courseName
    ),

    datasets:[
      {
        label:"Students",

        data: courses.map(
          (course)=>
            course.totalStudentsEnrolled ??
            course.studentsEnroled?.length ??
            0
        ),

        backgroundColor:colors,

        borderWidth:1,
      }
    ]

  };



  const chartIncomeData = {

    labels:courses.map(
      (course)=>course.courseName
    ),

    datasets:[
      {

        label:"Income",

        data:courses.map(
          (course)=>
            course.totalAmountGenerated ??
            course.price ??
            0
        ),

        backgroundColor:colors,

        borderWidth:1,

      }
    ]

  };



  const options={

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

      legend:{

        position:"bottom",

        labels:{

          color:"#DBDDEA",

          boxWidth:12,

          padding:15,

        }

      }

    }

  };



  return (

    <div className="
      flex
      flex-1
      flex-col
      gap-5
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
          font-semibold
          text-richblack-5
        ">
          Visualize
        </p>


        <div className="
          flex
          gap-2
        ">


          <button

            onClick={()=>setCurrChart("students")}

            className={`
              rounded-lg
              px-4
              py-2
              text-sm
              font-semibold
              transition-all
              ${
                currChart==="students"
                ?
                "bg-yellow-50 text-richblack-900"
                :
                "bg-richblack-700 text-richblack-200"
              }
            `}

          >
            Students

          </button>



          <button

            onClick={()=>setCurrChart("income")}

            className={`
              rounded-lg
              px-4
              py-2
              text-sm
              font-semibold
              transition-all
              ${
                currChart==="income"
                ?
                "bg-yellow-50 text-richblack-900"
                :
                "bg-richblack-700 text-richblack-200"
              }
            `}

          >
            Income

          </button>


        </div>


      </div>




      <div className="
        h-[320px]
        w-full
      ">


        {
          courses.length > 0 ?

          <Pie

            data={
              currChart==="students"
              ?
              chartDataStudents
              :
              chartIncomeData
            }

            options={options}

          />


          :

          <div className="
            grid
            h-full
            place-items-center
            text-richblack-300
          ">

            No data available

          </div>

        }


      </div>


    </div>

  );

}