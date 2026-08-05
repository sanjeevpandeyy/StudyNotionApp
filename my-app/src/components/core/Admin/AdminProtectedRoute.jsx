import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminProtectedRoute({children}){

 const {user}=useSelector(
  (state)=>state.profile
 );

 const {token}=useSelector(
  (state)=>state.auth
 );

 if(!token){
  return <Navigate to="/login"/>;
 }

 if(user?.accountType !== "Admin"){
  return <Navigate to="/dashboard/my-profile"/>;
 }

 return children;
}