import { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "react-super-responsive-table";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import ConfirmationModal from "../../../../common/ConfirmationModal";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}) {

  const [confirmationModal, setConfirmationModal] = useState(null);


  const deleteHandler = (id) => {

    setConfirmationModal({

      text1: "Delete Category?",

      text2:
        "All courses related to this category may be affected.",

      btn1Text: "Delete",

      btn2Text: "Cancel",

      btn1Handler: () => {

        onDelete(id);

        setConfirmationModal(null);

      },

      btn2Handler: () => {

        setConfirmationModal(null);

      },

    });

  };


  return (
    <>

      {/* Desktop + Large Tablet */}

      <div className="hidden min-[790px]:block overflow-x-auto rounded-xl border border-richblack-700">

        <Table className="w-full">

          <Thead>

            <Tr className="bg-richblack-700 border-b border-richblack-600">

              <Th className="px-6 py-4 text-left text-sm text-richblack-200">
                Category Name
              </Th>

              <Th className="px-6 py-4 text-left text-sm text-richblack-200">
                Description
              </Th>

              <Th className="px-6 py-4 text-center text-sm text-richblack-200">
                Action
              </Th>

            </Tr>

          </Thead>


          <Tbody>

            {
              categories?.map((category) => (

                <Tr
                  key={category._id}
                  className="
                  border-b
                  border-richblack-700
                  hover:bg-richblack-700/50
                  "
                >

                  <Td className="px-6 py-5 font-semibold text-richblack-5">
                    {category.name}
                  </Td>


                  <Td className="px-6 py-5 max-w-[350px] text-sm text-richblack-200">
                    {category.description}
                  </Td>


                  <Td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(category)}
                        className="
                        rounded-lg
                        bg-richblack-600
                        p-2
                        text-yellow-50
                        hover:bg-yellow-900
                        "
                      >
                        <FiEdit2 />
                      </button>


                      <button
                        onClick={() => deleteHandler(category._id)}
                        className="
                        rounded-lg
                        bg-richblack-600
                        p-2
                        text-pink-200
                        hover:bg-pink-900
                        "
                      >
                        <RiDeleteBin6Line />
                      </button>

                    </div>

                  </Td>

                </Tr>

              ))
            }

          </Tbody>

        </Table>

      </div>





      {/* Mobile + Small Tablet */}

      <div className="space-y-4 min-[790px]:hidden">

        {
          categories?.length === 0 ? (

            <div className="
              rounded-xl
              border
              border-richblack-700
              py-10
              text-center
              text-richblack-300
            ">
              No Categories Found
            </div>

          ) : (

            categories.map((category)=>(

              <div
                key={category._id}
                className="
                rounded-xl
                border
                border-richblack-700
                bg-richblack-800
                p-4
                "
              >

                <div className="flex justify-between gap-3">

                  <div>

                    <p className="
                      text-base
                      font-semibold
                      text-richblack-5
                    ">
                      {category.name}
                    </p>


                    <p className="
                      mt-2
                      text-sm
                      text-richblack-300
                    ">
                      {category.description}
                    </p>

                  </div>


                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(category)}
                      className="
                      h-fit
                      rounded-lg
                      bg-richblack-600
                      p-2
                      text-yellow-50
                      "
                    >
                      <FiEdit2 size={16}/>
                    </button>


                    <button
                      onClick={() => deleteHandler(category._id)}
                      className="
                      h-fit
                      rounded-lg
                      bg-richblack-600
                      p-2
                      text-pink-200
                      "
                    >
                      <RiDeleteBin6Line size={16}/>
                    </button>

                  </div>


                </div>


              </div>

            ))

          )

        }

      </div>



      {
        confirmationModal && (
          <ConfirmationModal
            modalData={confirmationModal}
          />
        )
      }

    </>
  );
}