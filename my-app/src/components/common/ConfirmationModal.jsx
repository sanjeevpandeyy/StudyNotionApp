import { useRef } from "react";
import IconBtn from "./IconBtn";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function ConfirmationModal({ modalData }) {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    modalData?.btn2Handler();
  });

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="w-full max-w-[350px] rounded-lg border border-richblack-700 bg-richblack-800 p-5 sm:p-6 shadow-xl"
      >
        <p className="text-xl font-semibold text-richblack-5 sm:text-2xl">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 text-sm leading-6 text-richblack-200 sm:text-base">
          {modalData?.text2}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <button
            onClick={modalData?.btn2Handler}
            className="w-full rounded-md bg-richblack-200 px-5 py-2 font-semibold text-richblack-900 sm:w-fit"
          >
            {modalData?.btn2Text}
          </button>

          <div className="w-full sm:w-fit">
            <IconBtn
              onclick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
            />
          </div>
        </div>
      </div>
    </div>
  );
}