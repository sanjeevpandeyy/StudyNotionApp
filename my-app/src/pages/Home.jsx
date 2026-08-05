import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/homePage/HighlightText";
import CTAButton from "../components/core/homePage/Button";
import Banner from "../assets/Images/banner.mp4";
import Codeblogs from "../components/core/homePage/codeblogs";
import TimeLineSection from "../components/core/homePage/TimeLineSection";
import LearningLanguageSection from "../components/core/homePage/LearningLanguageSection";
import InstructorSection from "../components/core/homePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/homePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = () => {
  return (
  <div>
  {/* section 1  */}
  <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between text-white pb-[650px] sm:pb-[650px] md:pb-[350px] lg:pb-[180px] xl:pb-0">
    <Link to={"/signup"}>
    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800
font-bold text-richblack-200
shadow-sm shadow-richblack-500
hover:shadow-none
transition-all duration-300
hover:scale-95">
        <div className="flex flex-row  items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 ">
          <p>Become an Instructor</p>
          <FaArrowRight/>
        </div>
      </div>
    </Link>
    <div className="text-4xl text-center font-semibold mt-7">
             Empower Your Future with 
             <HighlightText text={"Coding Skills"} />
    </div>
    <div className="w-[75%] text-center text-lg font-bold text-richblack-300 mt-4">
     With our online coding courses, you can learn at your own pace, from anywhere in the world and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
    </div>
    <div className="flex flex-row gap-7 mt-8">
    <CTAButton active={true} linkto={"/signup"}>Learn More </CTAButton>
    <CTAButton active={false} linkto={"/login"}>Book a Demo </CTAButton>
    </div>




    <div className="shadow-blue-200 w-[80%]  mx-3 my-18 relative">
    <div className="w-[50%] bg-white h-[50%] rounded-[30%] absolute top-10 left-[25%] drop-shadow-[0_-20px_50px_#47A5C5]">

    </div>
    <video
    muted
    loop
    autoPlay
    className="drop-shadow-[20px_20px_0px_white]"
    >
      <source src={Banner} type="video/mp4"/>

    </video>
    </div>


  {/* part 1  */}

    <div>
     <Codeblogs 
     position={"lg:flex-row flex-col items-center"}
     heading={
      <div className="text-4xl font-semibold">
          Unlock your
          <HighlightText text={"coding potential"}/> <br></br>
          with our online courses
      </div>
     }
     subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
     CTABtn1={
      {
        btnText:"Try it Yourself",
        linkto:"/signup",
        active:true,
      }
     }
     CTABtn2={
      {
        btnText:"Learn More",
        linkto:"/login",
        active:false,
        
      }
     }
     codeblock={`<!DOCTYPE html>
<html lang="en">
<head><title>My Page</title></head>
<body>
<h1><a href="/">Header</a></h1>
<nav> <a href="/one">One</a>
<a href="/two">Two</a>
<a href="/three">Three</a>
</nav>
</body>
</html>`}

     codeColor={"text-yellow-25"}
     backgroundGradient={" bg-gradient-to-r from-pink-500 via-yellow-50 to-blue-50"}

     />

     
    </div>

    {/* part 2  */}
    <div>
     <Codeblogs 
     position={"lg:flex-row-reverse flex-col-reverse items-center"}
     heading={
      <div className="text-4xl font-semibold">
           Start
          <HighlightText text={"coding"}/>
          <br/>
          <HighlightText text={"in seconds"}/>
          
      </div>
     }
     subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
     CTABtn1={
      {
        btnText:"Continue Lesson",
        linkto:"/signup",
        active:true,
      }
     }
     CTABtn2={
      {
        btnText:"Learn More",
        linkto:"/login",
        active:false,
        
      }
     }
     codeblock={`import React from "react"; 
     import CTAButton from "./Button"; 
     import TypeAnimation from "react-type";
     import { FaArrowRight } from "react-icons/fa";
     const Home = () => { 
       return ( 
        <div>Home</div> 
        ) 
       } 
      export default Home;`}
     codeColor={"text-white"}
     backgroundGradient={" bg-blue-200"}

     />
    </div>
    <ExploreMore/>

  </div>
  
  {/* section 2  */}
  <div className="text-richblack-700 bg-pure-greys-5 pb-20">

   <div className="homepage_bg h-[310px] w-full flex items-center ">
    <div className="w-11/12 max-w-maxContent flex item-center gap-5 mx-auto justify-center mt-32">
     <div className="flex flex-col sm:flex-row text-white gap-7">
      <CTAButton active={true} linkto={"/signup"}> 
        <div className="flex flex-row items-center gap-2">
          <div>Explore Full Catalog</div>
          <FaArrowRight/>
        </div>
       
      </CTAButton> 

      <CTAButton active={false} linkto={"/signup"}>
        <div>
          Learn More
        </div>
      </CTAButton>

     </div>
    </div>
   </div>

   <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
   <div className="mt-20 mb-10 flex flex-col gap-10 lg:flex-row lg:justify-between">
   <div className="w-full lg:w-[45%] text-3xl sm:text-4xl font-semibold">
          Get the Skills you need for a
         <HighlightText text={"Job that is in demand "}/>
      </div>
      <div className="flex w-full lg:w-[40%] flex-col items-start gap-8">
        <div className="text-[16px]">
        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
        </div>
        <CTAButton active={true} linkto={"/signup"}>
            Learn More
        </CTAButton>
      </div>
    </div>

    <TimeLineSection/>
    <LearningLanguageSection/>
   </div>

  
  </div>




  {/* section 3  */}
  <div className="bg-richblack-900 text-white">
  <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center">

  <InstructorSection/>
  <h2 className="text-center text-4xl mt-10 font-semibold ">Review For Other Learners</h2>

      <div className="w-full max-w-7xl mx-auto py-12 ">
        <ReviewSlider />
      </div>
  </div>

</div>

  {/* footer  */}
<Footer/>



  </div>
  );
};

export default Home;