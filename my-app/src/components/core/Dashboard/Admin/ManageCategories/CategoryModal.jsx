import { useEffect, useState } from "react";

export default function CategoryModal({
  modalData,
  setModalData,
  onSubmit,
}) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });


  useEffect(() => {

    if (modalData?.category) {

      setFormData({
        name: modalData.category.name || "",
        description: modalData.category.description || "",
      });

    } else {

      setFormData({
        name: "",
        description: "",
      });

    }

  }, [modalData]);


  const changeHandler = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  const submitHandler = (e) => {

    e.preventDefault();

    if (!formData.name.trim()) return;

    onSubmit(
      formData,
      modalData?.category?._id
    );

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
      bg-black
      bg-opacity-50
      px-4
      "
    >

      <div
        className="
        w-full
        max-w-md
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-4
        sm:p-6
        "
      >

        <h2
          className="
          mb-5
          text-lg
          sm:text-xl
          font-semibold
          text-richblack-5
          "
        >

          {
            modalData?.category
              ? "Update Category"
              : "Create Category"
          }

        </h2>



        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Category name"
            className="
            w-full
            rounded-md
            border
            border-richblack-600
            bg-richblack-700
            p-3
            text-sm
            sm:text-base
            text-richblack-5
            outline-none
            "
          />



          <textarea
            name="description"
            value={formData.description}
            onChange={changeHandler}
            placeholder="Category description"
            className="
            h-28
            w-full
            resize-none
            rounded-md
            border
            border-richblack-600
            bg-richblack-700
            p-3
            text-sm
            sm:text-base
            text-richblack-5
            outline-none
            "
          />



          <div
            className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:justify-end
            sm:gap-x-4
            "
          >

            <button
              type="button"
              onClick={() => setModalData(null)}
              className="
              rounded-md
              bg-richblack-600
              px-5
              py-2
              font-semibold
              text-richblack-5
              "
            >
              Cancel
            </button>



            <button
              type="submit"
              className="
              rounded-md
              bg-yellow-50
              px-5
              py-2
              font-semibold
              text-richblack-900
              "
            >

              {
                modalData?.category
                  ? "Update"
                  : "Create"
              }

            </button>

          </div>


        </form>

      </div>

    </div>

  );
}