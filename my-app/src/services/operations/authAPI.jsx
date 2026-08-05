import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";

import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


// LOGOUT
export function logout(navigate) {
  return (dispatch) => {

    dispatch(setToken(null));
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out Successfully");

    navigate("/");
  };
}


// LOGIN
export function login(email, password, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true));

    try {

      const response = await apiConnector(
        "POST",
        endpoints.LOGIN_API,
        {
          email,
          password,
        }
      );


      if (!response.data.success) {
        throw new Error(response.data.message);
      }


      dispatch(setToken(response.data.token));

      dispatch(setUser(response.data.user));

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      toast.success("Login Successful");

      navigate("/dashboard/my-profile");


    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }


    dispatch(setLoading(false));
    toast.dismiss(toastId);

  };
}




// SIGNUP
export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true));


    try {

      const response = await apiConnector(
        "POST",
        endpoints.SIGNUP_API,
        {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        }
      );


      if (!response.data.success) {
        throw new Error(response.data.message);
      }


      toast.success("Signup Successful");

      navigate("/login");


    } catch(error){

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
      );

    }


    dispatch(setLoading(false));

    toast.dismiss(toastId);

  };
}




// SEND OTP
export function sendOtp(email, setOtpSent) {

  return async(dispatch)=>{

    const toastId = toast.loading("Sending OTP...");


    dispatch(setLoading(true));


    try {


      const response = await apiConnector(
        "POST",
        endpoints.SENDOTP_API,
        {
          email,
        }
      );


      if(!response.data.success){
        throw new Error(response.data.message);
      }


      toast.success("OTP Sent Successfully");

      setOtpSent(true);


    }catch(error){


      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP"
      );


    }


    dispatch(setLoading(false));

    toast.dismiss(toastId);

  };

}





// GET PASSWORD RESET TOKEN
export function getPasswordResetToken(
  email,
  setEmailSent
){

  return async(dispatch)=>{


    dispatch(setLoading(true));


    try{


      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSTOKEN_API,
        {
          email,
        }
      );


      console.log(
        "RESET PASSWORD TOKEN RESPONSE....",
        response
      );



      if(!response.data.success){

        throw new Error(
          response.data.message
        );

      }



      toast.success(
        "Reset Email Sent"
      );


      setEmailSent(true);



    }catch(error){


      console.log(
        "RESET PASSWORD TOKEN Error",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to send reset email"
      );


    }



    dispatch(setLoading(false));


  };

}





// RESET PASSWORD
export function resetPassword(
  password,
  confirmPassword,
  token,
  navigate
) {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {

      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSWORD_API,
        {
          password,
          confirmPassword,
          token,
        }
      );


      console.log(
        "RESET PASSWORD RESPONSE:",
        response
      );


      // backend success check
      if (!response.data.success) {

        throw new Error(
          response.data.message
        );

      }


      // token valid + password updated
      toast.success(
        "Password reset successfully"
      );


      // redirect login page
      navigate("/login");


    } catch (error) {


      console.log(
        "RESET PASSWORD ERROR:",
        error
      );


      toast.error(error.response?.data?.message ||
    "Your password reset link has expired. Please generate a new reset link."
      );


      // invalid / expired / already used token
      navigate("/forgot-password");

    }


    dispatch(setLoading(false));

  };

}