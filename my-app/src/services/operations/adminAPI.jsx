import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../api";

const {
 ADMIN_ANALYTICS_API,
 GET_PENDING_COURSES_API,
 APPROVE_COURSE_API,
 REJECT_COURSE_API,
 GET_ALL_USERS_API,
 GET_ALL_STUDENTS_API,
 GET_ALL_INSTRUCTORS_API,
 DELETE_USER_API,
 CREATE_CATEGORY_API,
 UPDATE_CATEGORY_API,
 DELETE_CATEGORY_API,
 SEARCH_INSTRUCTORS_API,
 SEARCH_STUDENTS_API
}=adminEndpoints;


// Dashboard Analytics

export const getAdminAnalytics=async()=>{
 let result=null;

 try{
  const response=await apiConnector(
   "GET",
   ADMIN_ANALYTICS_API
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  result=response.data.data;

 }catch(error){
  console.log("ANALYTICS ERROR",error);
  toast.error(error.message);
 }

 return result;
};


// Pending Courses

export const getPendingCourses=async()=>{
 let result=[];

 try{
  const response=await apiConnector(
   "GET",
   GET_PENDING_COURSES_API
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  result=response.data.data;

 }catch(error){
  console.log("PENDING COURSE ERROR",error);
  toast.error(error.message);
 }

 return result;
};


// Approve Course

export const approveCourse=async(courseId)=>{
 let result=null;

 try{
  const response=await apiConnector(
   "PUT",
   APPROVE_COURSE_API,
   {courseId}
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("Course Approved");

  result=response.data.data;

 }catch(error){
  console.log("APPROVE ERROR",error);
  toast.error(error.message);
 }

 return result;
};


// Reject Course

export const rejectCourse=async(courseId,rejectionReason)=>{
 let result=null;

 try{
  const response=await apiConnector(
   "PUT",
   REJECT_COURSE_API,
   {
    courseId,
    rejectionReason
   }
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("Course Rejected");

  result=response.data.data;

 }catch(error){
  console.log("REJECT ERROR",error);
  toast.error(error.message);
 }

 return result;
};


// Get All Users

export const getAllUsers=async()=>{
 let result=[];

 try{
  const response=await apiConnector(
   "GET",
   GET_ALL_USERS_API
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  result=response.data.data;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Students

export const getAllStudents=async()=>{
 let result=[];

 try{
  const response=await apiConnector(
   "GET",
   GET_ALL_STUDENTS_API
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  result=response.data.data;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Instructors

export const getAllInstructors=async()=>{
 let result=[];

 try{
  const response=await apiConnector(
   "GET",
   GET_ALL_INSTRUCTORS_API
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  result=response.data.data;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Delete User

export const deleteUser=async(userId)=>{
 let result=false;

 try{
  const response=await apiConnector(
   "DELETE",
   DELETE_USER_API,
   {userId}
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("User Deleted");

  result=true;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Create Category

export const createCategory=async(data)=>{
 let result=null;

 try{
  const response=await apiConnector(
   "POST",
   CREATE_CATEGORY_API,
   data
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("Category Created");

  result=response.data.data;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Update Category

export const updateCategory=async(data)=>{
 let result=null;

 try{
  const response=await apiConnector(
   "PUT",
   UPDATE_CATEGORY_API,
   data
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("Category Updated");

  result=response.data.data;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};


// Delete Category

export const deleteCategory=async(categoryId)=>{
 let result=false;

 try{
  const response=await apiConnector(
   "DELETE",
   DELETE_CATEGORY_API,
   {categoryId}
  );

  if(!response.data.success)
   throw new Error(response.data.message);

  toast.success("Category Deleted");

  result=true;

 }catch(error){
  console.log(error);
  toast.error(error.message);
 }

 return result;
};

// Search Students

export const searchStudents=async(query="")=>{
  let result=[];
 
  try{
   const response=await apiConnector(
    "GET",
    SEARCH_STUDENTS_API,
    null,
    null,
    {
     search:query,
    }
   );
 
   if(!response.data.success)
    throw new Error(response.data.message);
 
   result=response.data.data;
 
  }catch(error){
   console.log("SEARCH STUDENTS ERROR",error);
   toast.error(error.message);
  }
 
  return result;
 };
 
 
 // Search Instructors
 
 export const searchInstructors=async(query="")=>{
  let result=[];
 
  try{
   const response=await apiConnector(
    "GET",
    SEARCH_INSTRUCTORS_API,
    null,
    null,
    {
     search:query,
    }
   );
 
   if(!response.data.success)
    throw new Error(response.data.message);
 
   result=response.data.data;
 
  }catch(error){
   console.log("SEARCH INSTRUCTORS ERROR",error);
   toast.error(error.message);
  }
 
  return result;
 };