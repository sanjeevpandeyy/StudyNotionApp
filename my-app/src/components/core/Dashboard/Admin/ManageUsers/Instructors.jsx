import { useEffect, useState } from "react";

import {
  getAllInstructors,
  searchInstructors,
  deleteUser,
} from "../../../../../services/operations/adminAPI";

import UsersTable from "./UsersTable";


export default function Instructors(){

  const [instructors,setInstructors]=useState([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);



  const fetchInstructors=async()=>{

    setLoading(true);

    const result=await getAllInstructors();

    if(result){
      setInstructors(result);
    }

    setLoading(false);

  };



  useEffect(()=>{

    fetchInstructors();

  },[]);



  const handleSearch=async(value)=>{

    setSearch(value);


    if(value.trim()===""){

      fetchInstructors();

      return;

    }


    const result=await searchInstructors(value);


    if(result){

      setInstructors(result);

    }

  };



  const handleDelete=async(userId)=>{

    const result=await deleteUser(userId);


    if(result){

      fetchInstructors();

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
          Loading Instructors...
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
          Instructors
        </h2>



        <span className="
          w-fit
          rounded-full
          bg-caribbeangreen-900
          px-4
          py-1.5
          text-sm
          text-caribbeangreen-100
        ">
          {instructors.length} Instructors
        </span>


      </div>





      {/* Search */}

      <input

        type="text"

        value={search}

        onChange={(e)=>
          handleSearch(e.target.value)
        }

        placeholder="Search instructor by name or email..."

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






      {/* Table */}

      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-3
        sm:p-6
      ">


        <UsersTable

          users={instructors}

          role="Instructor"

          onDelete={handleDelete}

        />


      </div>



    </div>

  );

}