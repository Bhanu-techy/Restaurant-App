import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: {},
  removeCartItem: {},
  removeAllCartItems: {},
  incrementCartItemQuantity: {},
  decrementCartItemQuantity: {},
})

export default CartContext
