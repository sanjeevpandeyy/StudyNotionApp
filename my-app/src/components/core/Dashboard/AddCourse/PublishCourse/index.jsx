import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { submitCourseForApproval } from "../../../../../services/operations/courseDetailsAPI";
import {
  resetCourseState,
  setCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";

export default function PublishCourse() {
  const { handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (!course?._id) return;

    try {
      setLoading(true);

      const result = await submitCourseForApproval(course._id);

      console.log("RESULT:", result);
      
      if (result) {
        console.log("Going to My Courses...");
        dispatch(setCourse(result));
        goToCourses();
      } else {
        console.log("Result is null or undefined");
      }
      
    } catch (error) {
      console.log("SUBMIT COURSE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <h2 className="text-2xl font-semibold text-richblack-5">
        Submit Course
      </h2>

      <form onSubmit={handleSubmit(handleCoursePublish)}>
        <div className="my-6 rounded-md border border-yellow-500 bg-yellow-900/20 p-4">
          <p className="text-lg font-medium text-yellow-100">
            Ready to submit your course?
          </p>

          <p className="mt-2 text-sm text-yellow-300">
            Once submitted, your course will be sent to the admin for review.
            After approval, it will be published and become visible to students.
          </p>
        </div>

        <div className="ml-auto flex max-w-max items-center gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={goBack}
            className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
          >
            Back
          </button>

          <IconBtn
            type="submit"
            disabled={loading}
            text={
              loading
                ? "Submitting..."
                : "Submit For Approval"
            }
          />
        </div>
      </form>
    </div>
  );
}