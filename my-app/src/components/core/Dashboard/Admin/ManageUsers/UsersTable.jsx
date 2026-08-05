import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { formattedDate } from "../../../../../utils/dateFormatter";
import ConfirmationModal from "../../../../common/ConfirmationModal";

export default function UsersTable({ users, role = "User", onDelete }) {

  const [confirmationModal, setConfirmationModal] = useState(null);


  const openDeleteModal = (userId) => {

    setConfirmationModal({

      text1: `Delete ${role}?`,

      text2: `All data related to this ${(role || "user").toLowerCase()} will be removed.`,

      btn1Text: "Delete",

      btn2Text: "Cancel",

      btn1Handler: () => {
        onDelete(userId);
        setConfirmationModal(null);
      },

      btn2Handler: () => {
        setConfirmationModal(null);
      },

    });

  };


  const UserInfo = ({ user }) => (

    <div className="flex items-center gap-4">

      <img
        src={
          user.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}`
        }
        alt={user.firstName}
        className="
          h-12
          w-12
          rounded-full
          object-cover
          border
          border-richblack-600
        "
      />

      <div>

        <p className="font-semibold text-richblack-5">
          {user.firstName} {user.lastName}
        </p>

        <p className="text-xs text-richblack-300">
          {role}
        </p>

      </div>

    </div>

  );


  return (
    <>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <div className="
          min-w-[850px]
          overflow-hidden
          rounded-xl
          border
          border-richblack-700
        ">


          <div className="
            grid
            grid-cols-[2fr_2fr_1fr_80px]
            items-center
            gap-5
            bg-richblack-700
            px-6
            py-4
            text-sm
            font-semibold
            text-richblack-200
          ">

            <p>User</p>

            <p>Email</p>

            <p>Joined</p>

            <p>Action</p>

          </div>



          {
            users?.length === 0 ? (

              <div className="
                flex
                h-40
                items-center
                justify-center
                text-richblack-300
              ">
                No {role} Found
              </div>

            ) : (

              users.map((user)=>(

                <div
                  key={user._id}
                  className="
                    grid
                    grid-cols-[2fr_2fr_1fr_80px]
                    items-center
                    gap-5
                    border-t
                    border-richblack-700
                    px-6
                    py-5
                    transition
                    hover:bg-richblack-700
                  "
                >

                  <UserInfo user={user}/>


                  <p className="
                    truncate
                    text-sm
                    text-richblack-100
                  ">
                    {user.email}
                  </p>


                  <p className="
                    text-sm
                    text-richblack-100
                  ">
                    {formattedDate(user.createdAt)}
                  </p>


                  <button
                    onClick={()=>openDeleteModal(user._id)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      text-pink-200
                      transition
                      hover:bg-pink-200/10
                    "
                  >

                    <RiDeleteBin6Line size={20}/>

                  </button>


                </div>

              ))

            )
          }


        </div>

      </div>




      {/* Mobile + Tablet Cards */}

      <div className="lg:hidden space-y-4">


        {
          users?.length === 0 ? (

            <div className="
              rounded-xl
              border
              border-richblack-700
              p-6
              text-center
              text-richblack-300
            ">
              No {role} Found
            </div>

          ) : (

            users.map((user)=>(

              <div
                key={user._id}
                className="
                  rounded-xl
                  border
                  border-richblack-700
                  bg-richblack-800
                  p-5
                "
              >


                <UserInfo user={user}/>



                <div className="
                  mt-5
                  space-y-3
                  text-sm
                ">


                  <div className="
                    rounded-lg
                    bg-richblack-700
                    px-4
                    py-3
                  ">

                    <p className="text-richblack-400">
                      Email
                    </p>

                    <p className="
                      mt-1
                      break-all
                      text-richblack-5
                    ">
                      {user.email}
                    </p>

                  </div>



                  <div className="
                    rounded-lg
                    bg-richblack-700
                    px-4
                    py-3
                  ">

                    <p className="text-richblack-400">
                      Joined
                    </p>

                    <p className="mt-1 text-richblack-5">
                      {formattedDate(user.createdAt)}
                    </p>

                  </div>


                </div>



                <button
                  onClick={()=>openDeleteModal(user._id)}
                  className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-pink-200
                    py-3
                    font-semibold
                    text-richblack-900
                  "
                >

                  <RiDeleteBin6Line/>

                  Delete

                </button>


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