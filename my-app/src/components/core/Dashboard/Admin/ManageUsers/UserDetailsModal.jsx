export default function UserDetailsModal({
  user,
  setUser,
}) {

  if(!user) return null;


  return (

    <div className="
      fixed
      inset-0
      z-[1000]
      flex
      items-center
      justify-center
      bg-black/50
      px-4
    ">


      <div className="
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        border
        border-richblack-700
        bg-richblack-800
        p-5
        sm:p-6
      ">


        {/* Header */}

        <div className="
          mb-6
          flex
          items-center
          justify-between
        ">


          <h2 className="
            text-xl
            sm:text-2xl
            font-semibold
            text-richblack-5
          ">
            User Details
          </h2>



          <button
            onClick={()=>setUser(null)}
            className="
              rounded-full
              p-2
              text-xl
              text-richblack-300
              transition
              hover:bg-richblack-700
              hover:text-white
            "
          >
            ✕
          </button>


        </div>




        {/* Profile */}

        <div className="
          flex
          flex-col
          items-center
          gap-3
        ">


          <img
            src={
              user.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}`
            }
            alt={user.firstName}
            className="
              h-20
              w-20
              sm:h-24
              sm:w-24
              rounded-full
              object-cover
            "
          />



          <h3 className="
            text-lg
            sm:text-xl
            font-semibold
            text-center
            text-richblack-5
          ">
            {user.firstName} {user.lastName}
          </h3>



          <p className="
            max-w-full
            break-all
            text-sm
            sm:text-base
            text-richblack-300
          ">
            {user.email}
          </p>


        </div>





        {/* Details */}

        <div className="
          mt-6
          space-y-3
        ">


          {[
            {
              label:"Role",
              value:user.accountType
            },
            {
              label:"Joined",
              value:new Date(user.createdAt).toLocaleDateString()
            },
            {
              label:"Gender",
              value:user.additionalDetails?.gender || "N/A"
            },
            {
              label:"Phone",
              value:user.additionalDetails?.contactNumber || "N/A"
            }
          ].map((item,index)=>(

            <div
              key={index}
              className="
                flex
                flex-col
                gap-1
                rounded-xl
                bg-richblack-700
                px-4
                py-3
                sm:flex-row
                sm:justify-between
              "
            >

              <span className="
                text-sm
                text-richblack-300
              ">
                {item.label}
              </span>


              <span className="
                text-sm
                sm:text-base
                text-richblack-5
                break-all
              ">
                {item.value}
              </span>


            </div>

          ))}


        </div>





        <button
          onClick={()=>setUser(null)}
          className="
            mt-6
            w-full
            rounded-xl
            bg-pink-200
            py-3
            font-semibold
            text-richblack-900
            transition
            hover:scale-[1.02]
          "
        >
          Close
        </button>


      </div>


    </div>

  );

}