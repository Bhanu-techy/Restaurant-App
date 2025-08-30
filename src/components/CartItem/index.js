import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {details} = props
  const {dishName, dishCurrency, dishPrice, dishImage, dishId, count} = details

  const price = dishPrice * count

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        return (
          <li className="cart-list">
            <div className="cart-img-div">
              <img src={dishImage} alt={dishName} className="dish-cart-img" />
            </div>
            <p className="cart-dish-name">{dishName}</p>
            <div className="cart-btn-div">
              <button
                type="button"
                onClick={() => decrementCartItemQuantity(dishId)}
              >
                -
              </button>
              <p>{count}</p>
              <button
                type="button"
                onClick={() => incrementCartItemQuantity(dishId)}
              >
                +
              </button>
            </div>

            <p>
              Price : {price} {dishCurrency}
            </p>
            <button type="button" onClick={() => removeCartItem(dishId)}>
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
