import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Cart from "./components/core/Dashboard/cart";
import Privateroute from "./components/core/auth/Privateroute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";

import InstructorDashboard from "./components/core/Dashboard/instructorDashboard/InstructorDashboard";
import { useDispatch, useSelector } from "react-redux";



import AdminDashboard from "./components/core/Dashboard/Admin/AdminDashboard/AdminDashboard";
import ManageCourses from "./components/core/Dashboard/Admin/ManageCourses";
import ManageUsers from "./components/core/Dashboard/Admin/ManageUsers";
import ManageCategories from "./components/core/Dashboard/Admin/ManageCategories";
import RoleBasedRoute from "./components/core/auth/RoleBasedRoute";











function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        


        <Route path="/login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />
          
        <Route path="/signup" element={
            <OpenRoute>
                <Signup />
            </OpenRoute>
        } />
          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

        <Route
          path="reset-password/:token"
          element={
            <OpenRoute>
              <ResetPassword/>
            </OpenRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        >


          <Route index element={<MyProfile />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="cart" element={<Cart />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
         }

         {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="instructor" element={<InstructorDashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="edit-course/:courseId" element={<EditCourse />} />

              </>
            )
         }

         {
              user?.accountType === ACCOUNT_TYPE.ADMIN && (
                <>

                  <Route
                    path="admin"
                    element={
                      <RoleBasedRoute
                        allowedRoles={[ACCOUNT_TYPE.ADMIN]}
                      >
                        <AdminDashboard />
                      </RoleBasedRoute>
                    }
                  />


                  <Route
                    path="admin/courses"
                    element={
                      <RoleBasedRoute
                        allowedRoles={[ACCOUNT_TYPE.ADMIN]}
                      >
                        <ManageCourses />
                      </RoleBasedRoute>
                    }
                  />



                  <Route
                    path="admin/users"
                    element={
                      <RoleBasedRoute
                        allowedRoles={[ACCOUNT_TYPE.ADMIN]}
                      >
                        <ManageUsers />
                      </RoleBasedRoute>
                    }
                  />


                  <Route
                    path="admin/categories"
                    element={
                      <RoleBasedRoute
                        allowedRoles={[ACCOUNT_TYPE.ADMIN]}
                      >
                        <ManageCategories />
                      </RoleBasedRoute>
                    }
                  />

                </>
              )
            }
          
        </Route>

        <Route
            element={
              <Privateroute>
                <ViewCourse />
              </Privateroute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

          

        <Route path="*" element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
