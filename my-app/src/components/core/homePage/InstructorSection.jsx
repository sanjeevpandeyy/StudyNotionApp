import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex md:flex-row flex-col gap-20 items-center '>
      {/* left side */}
       <div className='md:w-[50%]'>
        <img src={Instructor} loading='lazy' alt='Instructor image' className='drop-shadow-[-20px_-20px_0px_white] w-full'/>
       </div>
       {/* right side */}
       <div className='flex flex-col md:w-[50%] gap-10 items-center'>
       <div className='text-4xl font-semibold w-[50%]'>
          Become an 
          <br/>
          <HighlightText text={"Instructor"}></HighlightText>
       </div>
       <p className='font-md text-[16px] w-[80%] text-richblack-300'>
       Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
       </p>
       <div className='w-fit'>
       <CTAButton active={true} linkto={"/signup"}>
       <div className='flex flex-row items-center '>
       Start Learning Today
       <FaArrowRight/>
       </div>
       </CTAButton>
       </div>
       
       </div>
      </div>
    </div>
  )
}

export default InstructorSection;