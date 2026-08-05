import { createSlice } from "@reduxjs/toolkit"

const getCartTotal = (cart) => {
  return cart.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  )
}


const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : []


const initialState = {

  cart: initialCart,

  total: getCartTotal(initialCart),

  totalItems: initialCart.length,

}


const cartSlice = createSlice({

  name: "cart",

  initialState,


  reducers: {


    addToCart: (state, action) => {

      const course = action.payload


      const alreadyExist = state.cart.some(
        (item) => item._id === course._id
      )


      if(alreadyExist){
        return
      }


      state.cart.push(course)


      state.totalItems = state.cart.length


      state.total = getCartTotal(state.cart)


      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart)
      )

      localStorage.setItem(
        "total",
        JSON.stringify(state.total)
      )

      localStorage.setItem(
        "totalItems",
        JSON.stringify(state.totalItems)
      )

    },



    removeFromCart:(state,action)=>{


      state.cart = state.cart.filter(
        (course)=>course._id !== action.payload
      )


      state.totalItems = state.cart.length


      state.total = getCartTotal(state.cart)



      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart)
      )


      localStorage.setItem(
        "total",
        JSON.stringify(state.total)
      )


      localStorage.setItem(
        "totalItems",
        JSON.stringify(state.totalItems)
      )

    },



    resetCart:(state)=>{

      state.cart=[]
      state.total=0
      state.totalItems=0


      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")

    }

  }

})


export const {
  addToCart,
  removeFromCart,
  resetCart,
}=cartSlice.actions


export default cartSlice.reducer