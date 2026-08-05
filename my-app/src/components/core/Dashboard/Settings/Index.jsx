import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-0">
      <h1 className="mb-8 text-2xl font-semibold text-richblack-5 sm:mb-10 sm:text-3xl lg:mb-14">
        Edit Profile
      </h1>

      <div className="space-y-6 sm:space-y-8">
        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdatePassword />

        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  );
}