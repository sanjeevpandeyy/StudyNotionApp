import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  // Register field
  useEffect(() => {
    register(name, {
      required: "Requirements are required",
      validate: (value) =>
        Array.isArray(value) && value.length > 0
          ? true
          : "Add at least one requirement",
    });
  }, [register, name]);

  // Load edit data
  useEffect(() => {
    if (editCourse && course) {
      setRequirementsList(course.instructions || []);
    }
  }, [editCourse, course]);

  // Sync with React Hook Form
  useEffect(() => {
    console.log("Calling setValue for Requirements:", requirementsList);
  
    setValue(name, requirementsList, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [requirementsList, name, setValue]);

  const handleAddRequirement = () => {
    const trimmed = requirement.trim();

    if (!trimmed) return;

    if (
      requirementsList.some(
        (item) => item.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setRequirement("");
      return;
    }

    setRequirementsList((prev) => [...prev, trimmed]);
    setRequirement("");
  };

  const handleRemoveRequirement = (index) => {
    setRequirementsList((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col gap-2">
        <input
          id={name}
          type="text"
          value={requirement}
          placeholder="Enter a requirement"
          className="form-style w-full"
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleAddRequirement();
            }
          }}
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-disc list-inside space-y-2">
          {requirementsList.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-richblack-5"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-3 text-xs text-pure-greys-300 underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}