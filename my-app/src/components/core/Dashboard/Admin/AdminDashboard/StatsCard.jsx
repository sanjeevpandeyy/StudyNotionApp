export default function StatsCard({ title, value, icon }) {

  return (

    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">

      <div className="flex items-center justify-between">

        <p className="text-sm text-richblack-200">
          {title}
        </p>


        {
          icon && (
            <div className="text-2xl text-yellow-50">
              {icon}
            </div>
          )
        }

      </div>


      <p className="mt-4 text-3xl font-semibold text-richblack-5">
        {value ?? 0}
      </p>


    </div>

  );

}