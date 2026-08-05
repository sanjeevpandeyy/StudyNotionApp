import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);
  const [chipInput, setChipInput] = useState("");

  // Register field
  useEffect(() => {
    register(name, {
      validate: (value) =>
        Array.isArray(value) && value.length > 0
          ? true
          : "Add at least one tag",
    });
  }, [register, name]);

  // Load edit data
  useEffect(() => {
    if (editCourse && course) {
      const tags = Array.isArray(course.tag)
        ? course.tag
        : course.tag
        ? [course.tag]
        : [];

      setChips(tags);
    }
  }, [editCourse, course]);

  // Sync with React Hook Form
  useEffect(() => {
    setValue(name, chips, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [chips, name, setValue]);

  // Add Tag
  const handleAddChip = () => {
    const chipValue = chipInput.trim();

    if (!chipValue) return;

    const currentChips = Array.isArray(chips) ? chips : [];

    if (
      currentChips.some(
        (chip) => chip.toLowerCase() === chipValue.toLowerCase()
      )
    ) {
      return;
    }

    setChips([...currentChips, chipValue]);
    setChipInput("");
  };

  // Delete Tag
  const handleDeleteChip = (index) => {
    setChips((prev) =>
      (Array.isArray(prev) ? prev : []).filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-richblack-5"
      >
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start gap-2">
        <input
          id={name}
          type="text"
          value={chipInput}
          placeholder={placeholder}
          onChange={(e) => setChipInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddChip();
            }
          }}
          className="form-style w-full"
        />

        <button
          type="button"
          onClick={handleAddChip}
          className="font-semibold text-yellow-50 hover:text-yellow-100"
        >
          Add Tag
        </button>
      </div>

      {Array.isArray(chips) && chips.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((chip, index) => (
            <div
              key={`${chip}-${index}`}
              className="flex items-center rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-richblack-900"
            >
              <span>{chip}</span>

              <button
                type="button"
                onClick={() => handleDeleteChip(index)}
                className="ml-2 rounded-full hover:text-red-600"
              >
                <MdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {errors[name] && (
        <span className="ml-1 text-xs text-pink-200">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}