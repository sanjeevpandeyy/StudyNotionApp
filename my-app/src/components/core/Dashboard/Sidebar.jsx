import { sidebarLinks } from "../../../data/dashboard-links";
import {
  NavLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../services/operations/authAPI";
import { resetCourseState } from "../../../slices/courseSlice";

function Sidebar({ setConfirmationModal, closeSidebar }) {

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const { loading: authLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const matchRoute = (route) => {
    return matchPath(
      { path: route },
      location.pathname
    );
  };


  const handleCloseSidebar = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };


  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] place-items-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <div className="flex h-full lg:h-[calc(100vh-3.5rem)] min-w-[220px] flex-col justify-between border-r border-richblack-700 bg-richblack-800 py-6">


      {/* Sidebar Links */}

      <div className="flex flex-col">

        {
          sidebarLinks.map((link) => {

            if (link.type && user?.accountType !== link.type) {
              return null;
            }


            const Icon = Icons[link.icon];


            return (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => {
                  dispatch(resetCourseState());
                  handleCloseSidebar();
                }}
                className={`relative px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  matchRoute(link.path)
                    ? "bg-yellow-800 text-yellow-50"
                    : "text-richblack-300 hover:bg-richblack-700"
                }`}
              >

                <span
                  className={`absolute left-0 top-0 h-full w-1 bg-yellow-50 ${
                    matchRoute(link.path)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />


                <div className="flex items-center gap-3">

                  {
                    Icon && (
                      <Icon className="text-lg" />
                    )
                  }

                  <span>
                    {link.name}
                  </span>

                </div>

              </NavLink>
            );

          })
        }

      </div>




      {/* Bottom Section */}

      <div className="flex flex-col">


        <div className="mx-auto mb-4 h-[1px] w-10/12 bg-richblack-700" />



        {/* Settings */}

        <NavLink
          to="/dashboard/settings"
          onClick={() => {
            dispatch(resetCourseState());
            handleCloseSidebar();
          }}
          className={`relative px-6 py-3 text-sm font-medium transition-all duration-200 ${
            matchRoute("/dashboard/settings")
              ? "bg-yellow-800 text-yellow-50"
              : "text-richblack-300 hover:bg-richblack-700"
          }`}
        >

          <span
            className={`absolute left-0 top-0 h-full w-1 bg-yellow-50 ${
              matchRoute("/dashboard/settings")
                ? "opacity-100"
                : "opacity-0"
            }`}
          />


          <div className="flex items-center gap-3">

            <VscSettingsGear className="text-lg" />

            <span>
              Settings
            </span>

          </div>

        </NavLink>




        {/* Logout */}

        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",

              btn1Handler: () => {
                dispatch(logout(navigate));
                handleCloseSidebar();
              },

              btn2Handler: () => {
                setConfirmationModal(null);
              },
            })
          }
          className="w-full px-6 py-3 text-sm font-medium text-richblack-300 transition-all duration-200 hover:bg-richblack-700"
        >

          <div className="flex items-center gap-3">

            <VscSignOut className="text-lg" />

            <span>
              Logout
            </span>

          </div>

        </button>


      </div>

    </div>
  );
}

export default Sidebar;