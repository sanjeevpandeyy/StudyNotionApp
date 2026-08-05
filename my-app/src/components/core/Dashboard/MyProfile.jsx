import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const editProfile = () => {
    navigate("/dashboard/settings");
  };

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold text-richblack-5">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="
        flex
        flex-col
        gap-5
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:p-8
      ">

        <div className="flex items-center gap-4">

          <img
            loading="lazy"
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="
              h-16
              w-16
              rounded-full
              object-cover
              sm:h-20
              sm:w-20
            "
          />

          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-sm text-richblack-300">
              {user?.email}
            </p>
          </div>

        </div>

        <IconBtn text="Edit" onclick={editProfile}>
          <RiEditBoxLine />
        </IconBtn>

      </div>


      {/* About */}
      <div className="
        space-y-6
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-5
        sm:p-8
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <p className="text-lg font-semibold text-richblack-5">
            About
          </p>

          <IconBtn text="Edit" onclick={editProfile}>
            <RiEditBoxLine />
          </IconBtn>

        </div>


        <p className="
          text-sm
          font-medium
          text-richblack-200
          break-words
        ">
          {
            user?.additionalDetails?.about ||
            "Write Something About Yourself"
          }
        </p>

      </div>


      {/* Personal Details */}
      <div className="
        space-y-6
        rounded-xl
        border
        border-richblack-700
        bg-richblack-800
        p-5
        sm:p-8
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>

          <IconBtn text="Edit" onclick={editProfile}>
            <RiEditBoxLine />
          </IconBtn>

        </div>


        <div className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
        ">


          <div className="space-y-5">

            <Detail
              title="First Name"
              value={user?.firstName}
            />

            <Detail
              title="Email"
              value={user?.email}
            />

            <Detail
              title="Gender"
              value={
                user?.additionalDetails?.gender ||
                "Add Gender"
              }
            />

          </div>


          <div className="space-y-5">

            <Detail
              title="Last Name"
              value={user?.lastName}
            />

            <Detail
              title="Phone Number"
              value={
                user?.additionalDetails?.contactNumber ||
                "Add Contact Number"
              }
            />

            <Detail
              title="Date Of Birth"
              value={
                formattedDate(
                  user?.additionalDetails?.dateOfBirth
                ) ||
                "Add Date Of Birth"
              }
            />

          </div>


        </div>

      </div>

    </div>
  );
}


function Detail({ title, value }) {
  return (
    <div>
      <p className="mb-2 text-sm text-richblack-400">
        {title}
      </p>

      <p className="break-words text-sm font-medium text-richblack-5">
        {value}
      </p>
    </div>
  );
}
