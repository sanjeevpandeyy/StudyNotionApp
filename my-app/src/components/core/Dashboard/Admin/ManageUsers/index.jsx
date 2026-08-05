import { useState } from "react";

import Students from "./Students";
import Instructors from "./Instructors";


export default function ManageUsers() {

  const [activeTab,setActiveTab] = useState("Students");


  return (

    <div className="space-y-6">


      {/* Header */}

      <div>

        <h1 className="
          text-2xl
          sm:text-3xl
          font-semibold
          text-richblack-5
        ">
          Manage Users
        </h1>


        <p className="
          mt-2
          text-sm
          sm:text-base
          text-richblack-300
        ">
          Manage students and instructors from one place.
        </p>

      </div>





      {/* Tabs */}

      <div className="
        flex
        w-full
        gap-2
        rounded-xl
        bg-richblack-800
        p-2
      ">


        <button
          onClick={()=>setActiveTab("Students")}
          className={`
            flex-1
            rounded-lg
            px-4
            py-2.5
            text-sm
            sm:text-base
            font-medium
            transition-all
            ${
              activeTab==="Students"
              ?
              "bg-yellow-50 text-richblack-900"
              :
              "text-richblack-200 hover:bg-richblack-700"
            }
          `}
        >
          Students
        </button>



        <button
          onClick={()=>setActiveTab("Instructors")}
          className={`
            flex-1
            rounded-lg
            px-4
            py-2.5
            text-sm
            sm:text-base
            font-medium
            transition-all
            ${
              activeTab==="Instructors"
              ?
              "bg-yellow-50 text-richblack-900"
              :
              "text-richblack-200 hover:bg-richblack-700"
            }
          `}
        >
          Instructors
        </button>


      </div>





      {/* Content */}

      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-3
        sm:p-6
      ">

        {
          activeTab==="Students"
          ?
          <Students/>
          :
          <Instructors/>
        }

      </div>


    </div>

  );

}