import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


  const dispatch = useDispatch();

  const { course } = useSelector(
    (state) => state.course
  );


  const [loading, setLoading] = useState(false);



  // Fill data for edit/view
  useEffect(() => {

    if (view || edit) {

      setValue(
        "title",
        modalData.title
      );

      setValue(
        "description",
        modalData.description
      );

      setValue(
        "timeDuration",
        modalData.timeDuration
      );

    }

  }, [view, edit, modalData, setValue]);





  // Edit subsection

  const handleEditSubsection = async () => {

    const values = getValues();

    const formData = new FormData();


    formData.append(
      "sectionId",
      modalData.sectionId
    );


    formData.append(
      "subSectionId",
      modalData._id
    );


    if(values.title !== modalData.title){
      formData.append(
        "title",
        values.title
      );
    }


    if(values.description !== modalData.description){
      formData.append(
        "description",
        values.description
      );
    }


    if(values.timeDuration !== modalData.timeDuration){
      formData.append(
        "timeDuration",
        values.timeDuration
      );
    }


    if(values.video){
      formData.append(
        "video",
        values.video
      );
    }



    setLoading(true);


    const result = await updateSubSection(
      formData
    );


    if(result){

      const updatedCourseContent =
        course.courseContent.map(
          (section)=>

            section._id === modalData.sectionId
            ? result
            : section
        );


      dispatch(
        setCourse({
          ...course,
          courseContent:
          updatedCourseContent,
        })
      );

    }


    setLoading(false);

    setModalData(null);

  };






  // Submit create subsection

  const onSubmit = async(data)=>{


    console.log(
      "SUBSECTION FORM DATA:",
      data
    );



    if(view)
      return;



    if(edit){

      await handleEditSubsection();

      return;

    }




    if(!data.video){

      toast.error(
        "Please upload lecture video"
      );

      return;

    }




    const formData = new FormData();


    formData.append(
      "sectionId",
      modalData
    );


    formData.append(
      "title",
      data.title
    );


    formData.append(
      "timeDuration",
      data.timeDuration
    );


    formData.append(
      "description",
      data.description
    );


    formData.append(
      "video",
      data.video
    );



    setLoading(true);



    try{


      const result =
        await createSubSection(
          formData
        );



      console.log(
        "SUBSECTION RESPONSE:",
        result
      );



      if(result){


        const updatedCourseContent =
          course.courseContent.map(
            (section)=>

              section._id === modalData
              ? result
              : section
          );



        dispatch(
          setCourse({
            ...course,
            courseContent:
            updatedCourseContent,
          })
        );


        setModalData(null);

      }



    }
    catch(error){

      console.log(
        "SUBSECTION ERROR:",
        error
      );

    }



    setLoading(false);


  };






  return (

    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">


      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">


        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">


          <p className="text-xl font-semibold text-richblack-5">

            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"}
            {" "}Lecture

          </p>



          <button
            type="button"
            onClick={() =>
              !loading && setModalData(null)
            }
          >

            <RxCross2 className="text-2xl text-richblack-5"/>

          </button>


        </div>





        <form
          onSubmit={
            handleSubmit(
              onSubmit,
              (errors)=>{
                console.log(
                  "FORM ERRORS:",
                  errors
                );
              }
            )
          }

          className="space-y-8 px-8 py-10"
        >



          <Upload

            name="video"

            label="Lecture Video"

            register={register}

            setValue={setValue}

            errors={errors}

            video={true}

            viewData={
              view
              ?
              modalData.videoUrl
              :
              null
            }

            editData={
              edit
              ?
              modalData.videoUrl
              :
              null
            }

          />






          <div className="flex flex-col space-y-2">


            <label className="text-sm text-richblack-5">

              Lecture Title

              <sup className="text-pink-200">*</sup>

            </label>



            <input

              disabled={view || loading}

              placeholder="Enter Lecture Title"

              {...register(
                "title",
                {
                  required:true
                }
              )}

              className="form-style w-full"

            />


            {
              errors.title &&
              <span className="text-xs text-pink-200">
                Title required
              </span>
            }


          </div>







          <div className="flex flex-col space-y-2">


            <label className="text-sm text-richblack-5">

              Time Duration

              <sup className="text-pink-200">*</sup>

            </label>



            <input

              disabled={view || loading}

              placeholder="Example: 10:30"

              {...register(
                "timeDuration",
                {
                  required:true
                }
              )}

              className="form-style w-full"

            />


          </div>








          <div className="flex flex-col space-y-2">


            <label className="text-sm text-richblack-5">

              Lecture Description

              <sup className="text-pink-200">*</sup>

            </label>



            <textarea

              disabled={view || loading}

              placeholder="Enter Lecture Description"

              {...register(
                "description",
                {
                  required:true
                }
              )}

              className="form-style resize-x-none min-h-[130px] w-full"

            />


          </div>






          {
            !view &&

            <div className="flex justify-end">

              <IconBtn

                type="submit"

                disabled={loading}

                text={
                  loading
                  ?
                  "Loading..."
                  :
                  edit
                  ?
                  "Save Changes"
                  :
                  "Save"
                }

              />

            </div>

          }



        </form>


      </div>


    </div>

  );
}