import { useEffect, useState } from "react";

import {
  getAllStudents,
  searchStudents,
  deleteUser,
} from "../../../../../services/operations/adminAPI";

import UsersTable from "./UsersTable";


export default function Students(){

  const [students,setStudents]=useState([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);



  const fetchStudents=async()=>{

    setLoading(true);

    const result=await getAllStudents();

    if(result){
      setStudents(result);
    }

    setLoading(false);

  };



  useEffect(()=>{

    fetchStudents();

  },[]);




  const handleSearch=async(value)=>{

    setSearch(value);


    if(value.trim()===""){

      fetchStudents();

      return;

    }


    const result=await searchStudents(value);


    if(result){

      setStudents(result);

    }

  };




  const handleDelete=async(userId)=>{

    const result=await deleteUser(userId);


    if(result){

      fetchStudents();

    }

  };




  if(loading){

    return (

      <div className="
        flex
        h-[40vh]
        items-center
        justify-center
      ">

        <p className="
          text-xl
          text-richblack-200
        ">
          Loading Students...
        </p>

      </div>

    );

  }




  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">


        <h2 className="
          text-xl
          sm:text-2xl
          font-semibold
          text-richblack-5
        ">
          Students
        </h2>



        <span className="
          w-fit
          rounded-full
          bg-yellow-900
          px-4
          py-1.5
          text-sm
          text-yellow-100
        ">
          {students.length} Students
        </span>


      </div>





      {/* Search */}

      <input

        type="text"

        value={search}

        onChange={(e)=>
          handleSearch(e.target.value)
        }

        placeholder="Search student by name or email..."

        className="
          w-full
          rounded-xl
          border
          border-richblack-600
          bg-richblack-700
          px-4
          py-3
          text-sm
          sm:text-base
          text-richblack-5
          outline-none
          transition
          focus:border-yellow-50
        "

      />





      {/* Table Container */}

      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-3
        sm:p-6
      ">


        <UsersTable

          users={students}

          role="Student"

          onDelete={handleDelete}

        />


      </div>



    </div>

  );

}