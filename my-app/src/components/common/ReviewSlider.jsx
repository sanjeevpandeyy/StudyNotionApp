import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import ReactStarsModule from "react-stars";
const ReactStars = ReactStarsModule.default;

import { FaStar } from "react-icons/fa";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/api";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        console.log(response.data);

        if (response?.data?.success) {
          setReviews(response.data.data || []);
        }
      } catch (error) {
        console.error(error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  if (!reviews.length) {
    return (
      <div className="py-10 text-center text-richblack-300">
        No reviews available.
      </div>
    );
  }

  return (
    <section className="w-full text-white">
      <div className="my-8 px-4 sm:my-10 sm:px-6 lg:my-12 lg:px-0">
      {reviews.length < 4 ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="w-full sm:w-[320px] lg:w-[300px] flex-shrink-0"
              >
                <div
                  className="
                    group
                    flex
                    h-[260px]
                    sm:h-[270px]
                    lg:h-[280px]
                    flex-col
                    rounded-2xl
                    border
                    border-richblack-700
                    bg-richblack-800/80
                    p-4
                    sm:p-5
                    lg:p-6
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-yellow-100
                    hover:shadow-[0_15px_35px_rgba(250,204,21,0.25)]
                  "
                >
                  {/* User */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={
                        review?.user?.image ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="User"
                      className="h-12 w-12 rounded-full border-2 border-yellow-100 object-cover sm:h-14 sm:w-14"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-richblack-5 sm:text-lg">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h3>

                      <p className="truncate text-xs text-richblack-300 sm:text-sm">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="mt-4 flex-1 text-sm leading-6 text-richblack-100 sm:text-base sm:leading-7">
                    {(review?.review || "").split(" ").length >
                    truncateWords
                      ? `${review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")}...`
                      : review?.review}
                  </p>

                  {/* Rating */}
                  <div className="mt-4 flex items-center justify-between">
                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={18}
                      edit={false}
                      activeColor="#FACC15"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />

                    <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-richblack-900 sm:px-3 sm:text-sm">
                      {Number(review?.rating || 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (          <Swiper
            spaceBetween={24}
            loop={reviews.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 1.3,
                spaceBetween: 18,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.3,
                spaceBetween: 22,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="py-3">
                <div
                  className="
                    group
                    flex
                    h-[260px]
                    sm:h-[270px]
                    lg:h-[280px]
                    flex-col
                    rounded-2xl
                    border
                    border-richblack-700
                    bg-richblack-800/80
                    p-4
                    sm:p-5
                    lg:p-6
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-yellow-100
                    hover:shadow-[0_15px_35px_rgba(250,204,21,0.25)]
                  "
                >
                  {/* User */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={
                        review?.user?.image ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="User"
                      className="h-12 w-12 rounded-full border-2 border-yellow-100 object-cover sm:h-14 sm:w-14"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-richblack-5 sm:text-lg">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h3>

                      <p className="truncate text-xs text-richblack-300 sm:text-sm">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="mt-4 flex-1 text-sm leading-6 text-richblack-100 sm:text-base sm:leading-7">
                    {(review?.review || "").split(" ").length >
                    truncateWords
                      ? `${review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")}...`
                      : review?.review}
                  </p>

                  {/* Rating */}
                  <div className="mt-4 flex items-center justify-between">
                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={18}
                      edit={false}
                      activeColor="#FACC15"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />

                    <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-richblack-900 sm:px-3 sm:text-sm">
                      {Number(review?.rating || 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        </div>

<style jsx>{`
  .swiper-pagination {
    position: relative;
    margin-top: 24px;
  }

  .swiper-pagination-bullet {
    background: #6e727f;
    opacity: 1;
    width: 10px;
    height: 10px;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: #facc15;
    width: 24px;
    border-radius: 999px;
  }

  @media (max-width: 640px) {
    .swiper-pagination {
      margin-top: 18px;
    }

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
    }

    .swiper-pagination-bullet-active {
      width: 20px;
    }
  }
`}</style>
</section>
);
}

export default ReviewSlider;
