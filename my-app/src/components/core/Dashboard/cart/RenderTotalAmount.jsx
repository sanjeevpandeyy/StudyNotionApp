import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {

  const { total, cart } = useSelector(
    (state) => state.cart
  )

  const { user } = useSelector(
    (state) => state.profile
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleBuyCourse = () => {

    const courses = cart.map(
      (course) => course._id
    )

    buyCourse(
      courses,
      user,
      navigate,
      dispatch
    )

  }


  return (

    <div className="
      w-full
      rounded-xl
      border
      border-richblack-700
      bg-richblack-800
      p-6
      xl:w-[320px]
    ">

      <p className="
        mb-2
        text-sm
        text-richblack-300
      ">
        Total:
      </p>


      <p className="
        mb-6
        text-3xl
        font-semibold
        text-yellow-100
      ">
        ₹ {total || 0}
      </p>


      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />

    </div>

  )
}