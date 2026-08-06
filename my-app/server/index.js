const express=require("express");
const app=express();
const userRoutes=require("./routes/Users");
const paymentRoutes=require("./routes/Payment");
const courseRoutes=require("./routes/Course");
const profileRoutes=require("./routes/Profile");
const contactUsRoute=require("./routes/Contact");
const adminRoutes = require("./routes/Admin");
const adminCourseRoutes=require("./routes/AdminCourse");
const adminCategoryRoutes=require("./routes/AdminCategory");
const adminAnalyticsRoutes=require("./routes/AdminAnalytics");


require("dotenv").config();

const database=require("./config/databse");
const cookieParser=require("cookie-parser");
const PORT=process.env.PORT||4000;

const cors=require("cors");
const {coludinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");
//databse connection
database();
//add middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
     tempFileDir:"/tmp",
  })
)

//cloudinary connection
coludinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/admin/course",adminCourseRoutes);
app.use("/api/v1/admin/category",adminCategoryRoutes);
app.use("/api/v1/admin",adminAnalyticsRoutes);


//activate server

const net = require("net");

app.get("/smtp-test", (req, res) => {
  const socket = net.createConnection({
    host: "smtp.gmail.com",
    port: 587, // change from 465
  });

  socket.setTimeout(10000);

  socket.on("connect", () => {
    socket.destroy();
    res.json({
      success: true,
      message: "Connected to Gmail SMTP on 587",
    });
  });

  socket.on("timeout", () => {
    socket.destroy();
    res.json({
      success: false,
      code: "ETIMEDOUT",
      port: 587,
    });
  });

  socket.on("error", (err) => {
    res.json({
      success: false,
      code: err.code,
      port: 587,
      message: err.message,
    });
  });
});

app.listen(PORT,()=>{
  console.log(`app is running at ${PORT}`);
})
