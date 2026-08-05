import { MdSupervisorAccount } from "react-icons/md";
import { FaSitemap } from "react-icons/fa6";

export default function CourseCard({
  cardData,
  currentCard,
  setCurrentCard,
}) {
  const active = cardData.heading === currentCard;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className="group cursor-pointer"
    >
      <div
        className={`
          relative
          flex
          min-h-[280px]
          w-full
          flex-col
          rounded-xl
          p-6
          transition-all
          duration-300

          sm:w-[300px]
          md:w-[340px]
          lg:w-[360px]

          ${
            active
              ? "bg-richblack-5 shadow-[8px_8px_0px_0px_#FFD60A]"
              : "bg-richblack-800 hover:-translate-y-2 hover:bg-richblack-700"
          }
        `}
      >

        <h2
          className={`
            text-xl
            font-semibold
            ${
              active
                ? "text-richblack-900"
                : "text-richblack-5"
            }
          `}
        >
          {cardData.heading}
        </h2>


        <p
          className={`
            mt-4
            text-sm
            leading-6
            ${
              active
              ? "text-richblack-700"
              : "text-richblack-300"
            }
          `}
        >
          {cardData.description}
        </p>


        <div className="my-auto border-t border-dashed border-richblack-400 pt-5 mt-8">


          <div className="flex items-center justify-between">


            <div
              className={`
                flex
                items-center
                gap-2
                text-sm

                ${
                  active
                  ? "text-blue-600"
                  : "text-richblack-300"
                }
              `}
            >
              <MdSupervisorAccount className="text-xl"/>

              <span>
                {cardData.level}
              </span>
            </div>



            <div
              className={`
                flex
                items-center
                gap-2
                text-sm

                ${
                  active
                  ? "text-blue-600"
                  : "text-richblack-300"
                }
              `}
            >
              <FaSitemap className="text-xl"/>

              <span>
                {cardData.lessionNumber} Lessons
              </span>
            </div>


          </div>


        </div>


      </div>
    </div>
  );
}