import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";

import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  // CREATE / UPDATE SECTION
  const onSubmit = async (data) => {

    const sectionName = data.sectionName?.trim();

    if (!sectionName) {
      toast.error("Section name required");
      return;
    }

    if (!course?._id) {
      toast.error("Course not found");
      return;
    }


    setLoading(true);

    let result = null;


    if (editSectionName) {

      result = await updateSection({
        sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      });

    } 
    else {

      result = await createSection({
        sectionName,
        courseId: course._id,
      });

    }


    console.log("SECTION RESPONSE:", result);


    if (result) {

      dispatch(setCourse(result));

      setEditSectionName(null);

      setValue(
        "sectionName",
        ""
      );

    }


    setLoading(false);

  };



  // EDIT SECTION
  const handleChangeEditSectionName = (
    sectionId,
    sectionName
  ) => {

    if (editSectionName === sectionId) {

      setEditSectionName(null);
      setValue(
        "sectionName",
        ""
      );

      return;
    }


    setEditSectionName(sectionId);

    setValue(
      "sectionName",
      sectionName
    );

  };



  // CANCEL EDIT
  const cancelEdit = () => {

    setEditSectionName(null);

    setValue(
      "sectionName",
      ""
    );

  };



  // NEXT STEP
  const goToNext = () => {

    if (!course?.courseContent?.length) {

      toast.error(
        "Please create at least one section"
      );

      return;
    }


    const emptySection =
      course.courseContent.some(
        (section) =>
          !section.subSection ||
          section.subSection.length === 0
      );


    if (emptySection) {

      toast.error(
        "Each section needs at least one lecture"
      );

      return;
    }


    dispatch(setStep(3));

  };



  // BACK
  const goBack = () => {

    dispatch(setStep(1));

    dispatch(setEditCourse(true));

  };



  return (

    <div className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">

      <h2 className="text-2xl font-semibold text-richblack-5">
        Course Builder
      </h2>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <div className="flex flex-col gap-2">

          <label className="text-sm text-richblack-5">
            Section Name
            <sup className="text-pink-200">*</sup>
          </label>


          <input
            disabled={loading}
            placeholder="Add a section"
            className="form-style w-full"
            {...register(
              "sectionName",
              {
                required:
                  "Section name is required",
              }
            )}
          />


          {
            errors.sectionName && (
              <span className="text-xs text-pink-200">
                {errors.sectionName.message}
              </span>
            )
          }

        </div>



        <IconBtn
          type="submit"
          disabled={loading}
          outline
          text={
            editSectionName
              ? "Update Section"
              : "Create Section"
          }
        >

          <IoAddCircleOutline
            size={20}
            className="text-yellow-50"
          />

        </IconBtn>



        {
          editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="ml-4 text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )
        }


      </form>



      {
        course?.courseContent?.length > 0 &&
        <NestedView
          handleChangeEditSectionName={
            handleChangeEditSectionName
          }
        />
      }



      <div className="flex justify-end gap-3">


        <button
          type="button"
          onClick={goBack}
          disabled={loading}
          className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
        >
          Back
        </button>



        <IconBtn
          text="Next"
          disabled={loading}
          onclick={goToNext}
        >

          <MdNavigateNext />

        </IconBtn>


      </div>


    </div>

  );
}