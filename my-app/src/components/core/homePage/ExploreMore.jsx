import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName=[
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab,setCurrentTab]=useState(tabsName[0]);
  const [courses,setCourses]=useState(HomePageExplore[0].courses);
  const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

  const setmyCard=(value)=>{
    setCurrentTab(value);
    const result =HomePageExplore.filter((course)=>course.tag===value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }


  return (
    <div>
      <div className='text-4xl font-semibold text-center'>
      Unlock the 
      <HighlightText text={"Power of Code"}/>
      </div>
      <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
      Learn to build anything you can imagine
      </p>
      <div className='flex md:flex-row flex-col md:rounded-full rounded-4xl bg-richblack-800 md-4 md:pt-0 md:mb-5 md:mt-5 md:px-2 gap-2 md:gap-4 w-fit mx-auto items-center '>
        {
          tabsName.map((element,index)=>{
            return (
              <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab===element ? "bg-richblack-900 text-richblack-5 font-medium ":
              "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2 my-1 md:mx-0 mx-2`} key={index} onClick={()=>setmyCard(element)}>
                {element}
              </div>
            )
          })
        }
      </div>
      {/* cards part */}
      <div className='h-[150px] '>
      {/* course card ka group */}

      <div className="
            grid
            w-full
            mt-15
            gap-8
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3 justify-items-center
            
          ">
            {
              courses.map((element,index)=>(
                <CourseCard
                  key={index}
                  cardData={element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default ExploreMore;