import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { updateDisplayPicture } from "../../../../services/operations/SettingAPI";
import IconBtn from "../../../common/IconBtn";

export default function ChangeProfilePicture() {
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  };

  const handleFileUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profilePicture", imageFile);

      await dispatch(updateDisplayPicture(formData));

      setImageFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-5 sm:p-6 lg:p-8 lg:px-12">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">

        {/* Profile Image */}
        <img
          loading="lazy"
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="h-20 w-20 rounded-full object-cover sm:h-[78px] sm:w-[78px]"
        />

        {/* Content */}
        <div className="flex flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">

          <p className="text-lg font-medium text-richblack-5">
            Change Profile Picture
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
          />

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

            <button
              type="button"
              onClick={handleClick}
              disabled={loading}
              className={`w-full rounded-md px-5 py-2 font-semibold text-richblack-50 sm:w-auto ${
                loading
                  ? "cursor-not-allowed bg-richblack-600"
                  : "bg-richblack-700 hover:bg-richblack-600"
              }`}
            >
              Select
            </button>

            <div className="w-full sm:w-auto flex flex-col items-center">
              <IconBtn
                type="button"
                disabled={!imageFile || loading}
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}