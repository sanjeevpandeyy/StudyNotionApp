import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, name, setValue]);

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFile = (file) => {
    if (!file) return;

    const isValid = video
      ? file.type.startsWith("video/")
      : file.type.startsWith("image/");

    if (!isValid) {
      toast.error(
        `Please upload a valid ${video ? "video" : "image"} file.`
      );
      return;
    }

    setSelectedFile(file);
    previewFile(file);
  };

  const handleBrowse = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeFile = (e) => {
    e.stopPropagation();

    setSelectedFile(null);
    setPreviewSource("");
    setValue(name, null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={name}
        className="text-sm text-richblack-5"
      >
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        onClick={() => !previewSource && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-all duration-300 ${
          isDragActive
            ? "border-yellow-50 bg-richblack-600"
            : "border-richblack-500 bg-richblack-700"
        }`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                playsInline
                className="w-full rounded-md"
                preload="metadata"
              />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={removeFile}
                className="mt-3 w-fit text-sm text-richblack-300 underline transition-colors hover:text-yellow-50"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <input
              ref={inputRef}
              id={name}
              type="file"
              hidden
              accept={
                video
                  ? "video/mp4,video/webm,video/ogg"
                  : "image/jpeg,image/jpg,image/png"
              }
              onChange={handleBrowse}
            />

            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[220px] text-center text-sm text-richblack-200">
              Drag and drop an{" "}
              {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">
                Browse
              </span>{" "}
              a file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024 × 576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
