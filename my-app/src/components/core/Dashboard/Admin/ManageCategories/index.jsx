import { useEffect, useState } from "react";

import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";

import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../../services/operations/adminAPI";

export default function ManageCategories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);


  const fetchCategories = async () => {

    setLoading(true);

    const result = await fetchCourseCategories();

    if (result) {
      setCategories(result);
    }

    setLoading(false);

  };


  useEffect(() => {

    fetchCategories();

  }, []);



  const handleSubmit = async (data, categoryId) => {

    let result;

    if (categoryId) {

      result = await updateCategory({
        categoryId,
        ...data,
      });

    } else {

      result = await createCategory(data);

    }


    if (result) {

      setModalData(null);
      fetchCategories();

    }

  };



  const handleDelete = async (categoryId) => {

    const result = await deleteCategory(categoryId);

    if (result) {

      setCategories((prev) =>
        prev.filter(
          (category) => category._id !== categoryId
        )
      );

    }

  };



  if (loading) {

    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-xl text-richblack-200">
          Loading Categories...
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
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">


        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-semibold
            text-richblack-5
          ">
            Manage Categories
          </h1>


          <p className="
            mt-2
            text-sm
            sm:text-base
            text-richblack-300
          ">
            Create, update and manage course categories.
          </p>

        </div>



        <button
          onClick={() => setModalData({})}
          className="
            w-full
            sm:w-auto
            rounded-md
            bg-yellow-50
            px-5
            py-2
            font-semibold
            text-richblack-900
          "
        >
          Add Category
        </button>


      </div>




      {/* Table Container */}

      <div className="
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-3
        sm:p-6
      ">

        <CategoryTable

          categories={categories}

          setCategories={setCategories}

          onEdit={(category) =>
            setModalData({ category })
          }

          onDelete={handleDelete}

        />

      </div>




      {
        modalData && (

          <CategoryModal

            modalData={modalData}

            setModalData={setModalData}

            onSubmit={handleSubmit}

          />

        )
      }


    </div>

  );
}