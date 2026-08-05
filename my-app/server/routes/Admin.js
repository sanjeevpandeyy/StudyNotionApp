const express = require("express");
const router = express.Router();

const {
    getAdminDashboard,
    getAllUsers,
    deleteUser,
    getAllStudents,
    getAllInstructors,
    searchStudents,
   searchInstructors,
} = require("../controller/Admin");


const {
    auth,
    isAdmin
} = require("../middlewares/auth");



// Dashboard Overview
router.get(
    "/dashboard",
    auth,
    isAdmin,
    getAdminDashboard
);


// Users

router.get(
    "/users",
    auth,
    isAdmin,
    getAllUsers
);


router.get(
    "/students",
    auth,
    isAdmin,
    getAllStudents
);


router.get(
    "/instructors",
    auth,
    isAdmin,
    getAllInstructors
);


router.delete(
    "/deleteUser",
    auth,
    isAdmin,
    deleteUser
);

router.get(
    "/searchStudents",
    auth,
    isAdmin,
    searchStudents
  );
  
  router.get(
    "/searchInstructors",
    auth,
    isAdmin,
    searchInstructors
  );




module.exports = router;