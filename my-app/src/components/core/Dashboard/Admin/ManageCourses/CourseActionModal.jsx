import { useState } from "react";

export default function CourseActionModal({
  modalData,
  setModalData,
  handleReject,
}) {

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const submitHandler = async () => {

    if (!reason.trim()) {

      setError("Please enter rejection reason");

      return;

    }


    try {

      setLoading(true);

      await handleReject(
        modalData.courseId,
        reason
      );

      setModalData(null);
      setReason("");

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  const closeModal = () => {

    setModalData(null);
    setReason("");
    setError("");

  };


  return (

    <div
      className="
      fixed
      inset-0
      z-[1000]
      flex
      items-center
      justify-center
      bg-black/50
      px-4
      "
    >


      <div
        className="
        w-full
        max-w-lg
        rounded-2xl
        border
        border-richblack-700
        bg-richblack-800
        p-5
        sm:p-6
        shadow-xl
        "
      >


        <h2
          className="
          mb-3
          text-xl
          sm:text-2xl
          font-semibold
          text-richblack-5
          "
        >
          Reject Course
        </h2>



        <p
          className="
          mb-5
          text-sm
          sm:text-base
          text-richblack-300
          "
        >
          Please provide a reason before rejecting this course.
        </p>




        <textarea
          value={reason}
          disabled={loading}
          onChange={(e)=>{

            setReason(e.target.value);
            setError("");

          }}
          placeholder="Enter rejection reason..."
          className="
          h-32
          sm:h-36
          w-full
          resize-none
          rounded-xl
          border
          border-richblack-600
          bg-richblack-700
          p-4
          text-sm
          sm:text-base
          text-richblack-5
          outline-none
          transition
          focus:border-yellow-50
          "
        />



        {
          error && (

            <p
              className="
              mt-2
              text-sm
              text-pink-200
              "
            >
              {error}
            </p>

          )
        }




        <div
          className="
          mt-6
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:justify-end
          "
        >


          <button
            disabled={loading}
            onClick={closeModal}
            className="
            rounded-xl
            bg-richblack-600
            px-5
            py-2.5
            font-semibold
            text-richblack-5
            transition
            hover:bg-richblack-500
            "
          >
            Cancel
          </button>




          <button
            disabled={loading}
            onClick={submitHandler}
            className="
            rounded-xl
            bg-pink-200
            px-5
            py-2.5
            font-semibold
            text-richblack-900
            transition
            hover:scale-105
            disabled:cursor-not-allowed
            disabled:opacity-60
            "
          >

            {
              loading
                ? "Rejecting..."
                : "Reject"
            }

          </button>


        </div>


      </div>


    </div>

  );
}