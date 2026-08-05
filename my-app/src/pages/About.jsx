import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"

import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/homePage/HighlightText"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-14 sm:py-16 lg:py-20 text-3xl sm:text-4xl lg:text-4xl font-semibold w-full lg:w-[70%]">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-4 w-full lg:w-[95%] text-center text-sm sm:text-base font-medium leading-7 text-richblack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          {/* Space for Images */}
          <div className="h-[110px] sm:h-[160px] lg:h-[150px]"></div>

          {/* Banner Images */}
          <div className="absolute bottom-0 left-1/2 grid w-full -translate-x-1/2 translate-y-[28%] grid-cols-3 gap-2 px-2 sm:gap-4 sm:px-4 lg:gap-5 lg:px-0">
            <img
              src={BannerImage1}
              alt="Students Learning"
              className="w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src={BannerImage2}
              alt="Online Education"
              className="w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src={BannerImage3}
              alt="Study Together"
              className="w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-10 text-richblack-500">
          <div className="h-[100px] sm:h-[130px]"></div>
          <Quote />
        </div>
      </section>

      {/* Story */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 text-richblack-500">

          {/* Founding Story */}
          <div className="flex flex-col-reverse items-center justify-between gap-10 py-14 lg:flex-row lg:py-24">
            <div className="flex w-full flex-col gap-6 lg:w-[50%] lg:gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl sm:text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Founding Story
              </h1>

              <p className="text-sm sm:text-base font-medium leading-7 text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p className="text-sm sm:text-base font-medium leading-7 text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="flex w-full justify-center lg:w-auto">
              <img
                src={FoundingStory}
                alt="Founding Story"
                className="w-full max-w-md rounded-lg shadow-[0_0_20px_0] shadow-[#FC6767] lg:max-w-full"
              />
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="flex flex-col gap-12 pb-10 lg:flex-row lg:justify-between">

            <div className="flex w-full flex-col gap-6 lg:w-[40%] lg:gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl sm:text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Vision
              </h1>

              <p className="text-sm sm:text-base font-medium leading-7 text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div className="flex w-full flex-col gap-6 lg:w-[40%] lg:gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-3xl sm:text-4xl font-semibold text-transparent lg:w-[70%]">
                Our Mission
              </h1>

              <p className="text-sm sm:text-base font-medium leading-7 text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of
                collaboration through forums, live sessions, and networking
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning Grid */}
      <section className="mx-auto mt-16 lg:mt-20 flex w-11/12 max-w-maxContent flex-col gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Reviews */}
      <section className="relative mx-auto my-16 lg:my-20 flex w-11/12 max-w-maxContent flex-col items-center gap-8 bg-richblack-900 text-white">
        <h1 className="mt-8 text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Reviews from other learners
        </h1>

        <ReviewSlider />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About