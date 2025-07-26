import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: {},
  removeCartItem: {},
})

export default CartContext
