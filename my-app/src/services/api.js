const BASE_URL = import.meta.env.VITE_BASE_URL;


export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showallcategory`,
};

export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDetails",
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRating",
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}


export const courseEndpoints = {
  // Course CRUD
  GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",

  CREATE_COURSE_API: BASE_URL + "/course/createcourse",
  EDIT_COURSE_API: BASE_URL + "/course/updateCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

  // Sections
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",

  // Sub Sections
  CREATE_SUBSECTION_API: BASE_URL + "/course/createsubsection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  // Instructor
  COURSE_CATEGORIES_API: BASE_URL + "/course/showallcategory",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",

  // Approval Workflow
  SUBMIT_COURSE_API: BASE_URL + "/course/submitCourse",
  GET_PENDING_COURSES_API: BASE_URL + "/course/pendingCourses",
  APPROVE_COURSE_API: BASE_URL + "/course/approveCourse",
  REJECT_COURSE_API: BASE_URL + "/course/rejectCourse",

  // Student
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_USER_REVIEW_API: BASE_URL + "/course/getUserReview",
};

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}



// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourse",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

//SETTING ENDPOINTS

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const adminEndpoints = {

  // Dashboard
  ADMIN_ANALYTICS_API:
    BASE_URL + "/admin/analytics",


  // Course Management
  GET_PENDING_COURSES_API:
    BASE_URL + "/admin/course/pendingCourses",

  APPROVE_COURSE_API:
    BASE_URL + "/admin/course/approveCourse",

  REJECT_COURSE_API:
    BASE_URL + "/admin/course/rejectCourse",


  // User Management
  GET_ALL_USERS_API:
    BASE_URL + "/admin/users",

  GET_ALL_STUDENTS_API:
    BASE_URL + "/admin/students",

  GET_ALL_INSTRUCTORS_API:
    BASE_URL + "/admin/instructors",

  SEARCH_STUDENTS_API:
    BASE_URL + "/admin/searchStudents",

  SEARCH_INSTRUCTORS_API:
    BASE_URL + "/admin/searchInstructors",

  DELETE_USER_API:
    BASE_URL + "/admin/deleteUser",


  // Category Management
  CREATE_CATEGORY_API:
    BASE_URL + "/admin/category/create",

  UPDATE_CATEGORY_API:
    BASE_URL + "/admin/category/update",

  DELETE_CATEGORY_API:
    BASE_URL + "/admin/category/delete",

};