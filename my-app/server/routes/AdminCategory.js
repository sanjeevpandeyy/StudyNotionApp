const express=require("express");
const router=express.Router();

const {
    createCategory,
    updateCategory,
    deleteCategory
}=require("../controller/AdminCategory");

const {
    auth,
    isAdmin
}=require("../middlewares/auth");


router.post(
"/create",
auth,
isAdmin,
createCategory
);


router.put(
"/update",
auth,
isAdmin,
updateCategory
);


router.delete(
"/delete",
auth,
isAdmin,
deleteCategory
);


module.exports=router;