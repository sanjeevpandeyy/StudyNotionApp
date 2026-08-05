import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

import { setCourse } from "../../../../../slices/courseSlice";

import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

export default function NestedView({ handleChangeEditSectionName }) {
  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  // Modal States
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Delete Section
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  // Delete Lecture
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourseContent =
        course?.courseContent?.map((section) =>
          section._id === sectionId ? result : section
        ) || [];

      dispatch(
        setCourse({
          ...course,
          courseContent: updatedCourseContent,
        })
      );
    }

    setConfirmationModal(null);
  };

  return (
    <>
      <div
        id="nestedViewContainer"
        className="rounded-lg bg-richblack-700 px-8 py-6"
      >
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-richblack-600 py-2">
              <div className="flex items-center gap-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />

                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300 hover:text-yellow-50 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2:
                        "All lectures inside this section will also be deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () =>
                        handleDeleteSection(section._id),
                      btn2Handler: () =>
                        setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300 hover:text-pink-200 transition-colors" />
                </button>

                <span className="text-richblack-300">|</span>

                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>

            <div className="px-6 pb-4">
              {section?.subSection?.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between border-b-2 border-richblack-600 py-2"
                >
                  <div className="flex items-center gap-3 py-2">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />

                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setEditSubSection({
                          ...data,
                          sectionId: section._id,
                        })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300 hover:text-yellow-50 transition-colors" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Lecture?",
                          text2:
                            "This lecture will be permanently deleted.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(
                              data._id,
                              section._id
                            ),
                          btn2Handler: () =>
                            setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300 hover:text-pink-200 transition-colors" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-2 text-yellow-50 transition-colors hover:text-yellow-100"
              >
                <FaPlus />
                <span>Add Lecture</span>
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Sub Section Modal */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      ) : null}

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}