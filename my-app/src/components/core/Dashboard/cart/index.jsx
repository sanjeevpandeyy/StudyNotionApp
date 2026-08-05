import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {

  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="w-full">

      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        Cart
      </h1>


      <p className="border-b border-richblack-700 pb-3 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>


      {
        totalItems > 0 ?

        (
          <div className="
            mt-8
            flex
            flex-col
            gap-8
            xl:flex-row
            xl:items-start
          ">

            <RenderCartCourses />

            <RenderTotalAmount />

          </div>
        )

        :

        (

          <p className="
            mt-14
            text-center
            text-2xl
            text-richblack-100
          ">
            Your cart is empty
          </p>

        )

      }

    </div>
  )
}