import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../components/common/Footer";
import CourseSlider from "../components/Catalog/CourseSlider";
import Course_Card from "../components/Catalog/Course_Card";
import Error from "./Error";


import { apiConnector } from "../services/apiConnector";

import { categories } from "../services/api";

import { getCatalogaPageData } from "../services/operations/pageAndComponentData";

const Catalog = () => {

  const { loading } = useSelector((state) => state.profile);

  const { catalogName } = useParams();

  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");


  // Fetch Category ID
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        );
  
        const matchedCategory = res.data.allCategory.find(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catalogName.toLowerCase()
        );
  
    
  
        if (matchedCategory) {
          setCategoryId(matchedCategory._id);
        }
  
      } catch (error) {
        console.log("Category fetch error:", error);
      }
    };
  
    getCategories();
  }, [catalogName]);



  // Fetch Catalog Details
  useEffect(() => {
    if (!categoryId) return;

    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    getCategoryDetails();
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!catalogPageData.success) {
    return <Error />;
  }

  const {
    selectedCategoryCourses,
    getDifferentCategories,
    topSellingCourses,
  } = catalogPageData.data;

  const differentCategory = getDifferentCategories?.[0];

  return (
    <>
      {/* Hero */}
      <div className="bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContent flex-col justify-center gap-4">
          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="text-yellow-25">
              {" "}
              {selectedCategoryCourses?.name}
            </span>
          </p>

          <h1 className="text-3xl font-semibold text-richblack-5">
            {selectedCategoryCourses?.name}
          </h1>

          <p className="max-w-[850px] text-richblack-200">
            {selectedCategoryCourses?.description}
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        <h2 className="text-3xl font-semibold text-richblack-5">
          Courses to get you started
        </h2>

        <div className="my-6 flex border-b border-richblack-600">
          <button
            onClick={() => setActive(1)}
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-yellow-50 text-yellow-50"
                : "text-richblack-300"
            }`}
          >
            Most Popular
          </button>

          <button
            onClick={() => setActive(2)}
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-yellow-50 text-yellow-50"
                : "text-richblack-300"
            }`}
          >
            New
          </button>
        </div>

        <CourseSlider
          Courses={selectedCategoryCourses?.course || []}
        />
      </div>

      {/* Different Category */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        <h2 className="text-3xl font-semibold text-richblack-5">
          Top Courses in {differentCategory?.name}
        </h2>

        <div className="mt-8">
          <CourseSlider
            Courses={differentCategory?.course || []}
          />
        </div>
      </div>

      {/* Frequently Bought */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        <h2 className="text-3xl font-semibold text-richblack-5">
          Frequently Bought
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {topSellingCourses?.slice(0, 4).map((course) => (
            <Course_Card
              key={course._id}
              course={course}
              Height="h-[400px]"
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;