import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";
import { logout } from "./authAPI";


const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;



export function updateDisplayPicture(formData) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...");

    try {

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );


      console.log(
        "UPDATE_DISPLAY_PICTURE_API RESPONSE",
        response
      );


      if (!response.data.success) {
        throw new Error(response.data.message);
      }


      dispatch(setUser(response.data.data));


      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );


      toast.success(
        "Display Picture Updated Successfully"
      );


    } catch(error) {

      console.log(
        "UPDATE_DISPLAY_PICTURE_API ERROR",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Could Not Update Display Picture"
      );

    }

    toast.dismiss(toastId);
  };
}





export function updateProfile(formData) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...");


    try {


      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        formData
      );


      console.log(
        "UPDATE_PROFILE_API API RESPONSE............",
        response
      );


      if (!response.data.success) {
        throw new Error(response.data.message);
      }



      const updatedUser = {
        ...response.data.data,

        image:
          response.data.data.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`,
      };



      dispatch(setUser(updatedUser));



      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );



      toast.success("Profile Updated Successfully");



    } catch (error) {


      console.log(
        "UPDATE_PROFILE_API API ERROR............",
        error
      );


      toast.error("Could Not Update Profile");


    }


    toast.dismiss(toastId);

  };
}





export async function changePassword(formData) {

  const toastId = toast.loading("Loading...");


  try {


    const response = await apiConnector(
      "POST",
      CHANGE_PASSWORD_API,
      formData
    );


    console.log(
      "CHANGE_PASSWORD_API API RESPONSE............",
      response
    );


    if (!response.data.success) {
      throw new Error(response.data.message);
    }


    toast.success("Password Changed Successfully");



  } catch (error) {


    console.log(
      "CHANGE_PASSWORD_API API ERROR............",
      error
    );


    toast.error(
      error.response?.data?.message ||
      "Could Not Change Password"
    );


  }


  toast.dismiss(toastId);

}




export function deleteProfile(navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Deleting account...");

    try {

      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API
      );


      console.log(
        "DELETE_PROFILE_API RESPONSE",
        response
      );


      if(!response.data.success){
        throw new Error(response.data.message);
      }


      toast.success(
        "Profile Deleted Successfully"
      );


      dispatch(logout(navigate));


    } catch(error) {

      console.log(
        "DELETE_PROFILE_API ERROR",
        error.response?.data || error
      );


      toast.error(
        error.response?.data?.message ||
        "Could Not Delete Profile"
      );

    }


    toast.dismiss(toastId);

  };
}
