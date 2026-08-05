import { toast } from "react-hot-toast";
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from "react-icons/io5";

export const successToast = (message) => {
  const id = toast.success(
    <div className="flex w-full items-start justify-between gap-3">
      <span className="flex-1 break-words text-sm sm:text-base">
        {message}
      </span>

      <button
        onClick={() => toast.dismiss(id)}
        className="flex-shrink-0 text-gray-400 transition hover:text-gray-700"
      >
        <IoClose className="text-xl sm:text-2xl" />
      </button>
    </div>,
    {
      duration: 2000,
      icon: <IoCheckmarkCircle className="text-xl text-green-500 sm:text-2xl" />,
      style: {
        background: "#fff",
        color: "#111827",
        borderRadius: "14px",
        padding: "10px 14px",
        width: "100%",
        maxWidth: "420px",
      },
    }
  );
};

export const errorToast = (message) => {
  const id = toast.error(
    <div className="flex w-full items-start justify-between gap-3">
      <span className="flex-1 break-words text-sm sm:text-base">
        {message}
      </span>

      <button
        onClick={() => toast.dismiss(id)}
        className="flex-shrink-0 text-gray-600 transition hover:text-gray-700"
      >
        <IoClose className="text-xl sm:text-2xl" />
      </button>
    </div>,
    {
      duration: 2000,
      icon: <IoCloseCircle className="text-xl text-red-500 sm:text-2xl" />,
      style: {
        background: "#fff",
        color: "#111827",
        borderRadius: "14px",
        padding: "10px 14px",
        width: "100%",
        maxWidth: "420px",
      },
    }
  );
};