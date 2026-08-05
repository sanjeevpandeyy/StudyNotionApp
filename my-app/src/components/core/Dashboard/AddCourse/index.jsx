import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <div className="flex w-full flex-col gap-8 xl:flex-row">
      {/* Left Section */}
      <div className="flex flex-1 flex-col">
        <h1 className="mb-10 text-3xl font-semibold text-richblack-5">
          Add Course
        </h1>

        <RenderSteps />
      </div>

      {/* Right Section - Upload Tips */}
      <aside className="sticky top-10 hidden h-fit w-full max-w-[380px] rounded-lg border border-richblack-700 bg-richblack-800 p-6 xl:block">
        <h2 className="mb-6 text-lg font-semibold text-richblack-5">
          ⚡ Course Upload Tips
        </h2>

        <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-richblack-100">
          <li>Set the course price or make it free.</li>
          <li>Recommended thumbnail size: <strong>1024 × 576</strong>.</li>
          <li>Upload a high-quality course overview video.</li>
          <li>Use the Course Builder to organize sections and lectures.</li>
          <li>Add topics, lessons, quizzes, and assignments for better learning.</li>
          <li>Additional course information appears on the course details page.</li>
          <li>Create announcements to notify enrolled students.</li>
          <li>Review all course details before publishing.</li>
        </ul>
      </aside>
    </div>
  );
}