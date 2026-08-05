import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu } from "react-icons/fi";

import Sidebar from "../components/core/Dashboard/Sidebar";
import ConfirmationModal from "../components/common/ConfirmationModal";

function Dashboard() {

  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);


  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar setConfirmationModal={setConfirmationModal} />
        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenSidebar(true)}
          className="
          fixed
          top-20
          left-4
          z-40
          rounded-md
          bg-richblack-700
          p-2
          text-white
          lg:hidden
          "
        >
          <FiMenu size={22}/>
        </button>


        {/* Mobile Sidebar */}

        {
          openSidebar && (
            <div
              className="
              fixed
              inset-0
              z-50
              bg-black/50
              lg:hidden
              "
              onClick={() => setOpenSidebar(false)}
            >

              <div
                className="
                h-full
                w-[220px]
                bg-richblack-800
                "
                onClick={(e)=>e.stopPropagation()}
              >

                <Sidebar
                  setConfirmationModal={setConfirmationModal}
                  closeSidebar={()=>setOpenSidebar(false)}
                />

              </div>

            </div>
          )
        }



        {/* Content */}

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">

        <div className="mx-auto w-full max-w-[1000px] pl-16 pr-4 sm:pl-16 sm:pr-6 lg:px-0 py-6 sm:py-10">
          <Outlet />
        </div>
        </div>


      </div>


      {
        confirmationModal && (
          <ConfirmationModal modalData={confirmationModal}/>
        )
      }

    </>
  );
}

export default Dashboard;