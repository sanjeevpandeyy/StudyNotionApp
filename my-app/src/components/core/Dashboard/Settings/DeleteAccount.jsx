import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../../services/operations/SettingAPI";

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

const handleDeleteAccount = async () => {
  try {
    setDeleting(true);
    setShowModal(false);

    await dispatch(deleteProfile(navigate));

  } catch (error) {
    console.log("ERROR MESSAGE - ", error.message);
  } finally {
    setDeleting(false);
  }
};

  return (
    <>
      {/* Delete Card */}
      <div className="my-10 flex flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>

          <div className="max-w-[500px] text-pink-100">
            <p>Would you like to delete your account?</p>

            <p className="mt-1">
              Deleting your account is permanent. All your profile,
              enrolled courses, progress and other associated data
              will be removed permanently.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-fit italic text-pink-300 transition-all duration-200 hover:text-pink-100"
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-2xl">

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-2xl text-pink-100" />
              </div>

              <h2 className="text-2xl font-bold text-richblack-5">
                Delete Account
              </h2>
            </div>

            <p className="mt-5 text-richblack-300 leading-7">
              Are you sure you want to delete your account?
            </p>

            <p className="mt-2 text-sm text-pink-200">
              This action cannot be undone. All your profile,
              purchased courses, learning progress and other
              account data will be permanently deleted.
            </p>

            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-md bg-pink-600 px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-pink-700"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}