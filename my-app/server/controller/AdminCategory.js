const Category=require("../model/Category");


// Create Category
exports.createCategory=async(req,res)=>{
    try{

        const {name,description}=req.body;


        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }


        const existingCategory=await Category.findOne({
            name
        });


        if(existingCategory){
            return res.status(400).json({
                success:false,
                message:"Category already exists"
            });
        }


        const category=await Category.create({
            name,
            description
        });


        return res.status(201).json({
            success:true,
            message:"Category created successfully",
            data:category
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to create category"
        });
    }
};



// Update Category
exports.updateCategory=async(req,res)=>{
    try{

        const {
            categoryId,
            name,
            description
        }=req.body;


        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Category id required"
            });
        }


        const category=await Category.findById(categoryId);


        if(!category){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }


        if(name){
            category.name=name;
        }


        if(description){
            category.description=description;
        }


        await category.save();


        return res.status(200).json({
            success:true,
            message:"Category updated successfully",
            data:category
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to update category"
        });
    }
};



// Delete Category
exports.deleteCategory=async(req,res)=>{
    try{

        const {categoryId}=req.body;


        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Category id required"
            });
        }


        const category=await Category.findById(categoryId);


        if(!category){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }


        if(category.course.length>0){
            return res.status(400).json({
                success:false,
                message:"Cannot delete category with courses"
            });
        }


        await Category.findByIdAndDelete(categoryId);


        return res.status(200).json({
            success:true,
            message:"Category deleted successfully"
        });


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to delete category"
        });
    }
};