import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {details} = props
  const {
    dish_name,
    dish_currency,
    dish_price,
    dish_image,
    dish_id,
    count,
  } = details

  const price = dish_price * count

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
              <img src={dish_image} alt={dish_name} className="dish-cart-img" />
            </div>
            <p className="cart-dish-name">{dish_name}</p>
            <div className="cart-btn-div">
              <button
                type="button"
                onClick={() => decrementCartItemQuantity(dish_id)}
              >
                -
              </button>
              <p>{count}</p>
              <button
                type="button"
                onClick={() => incrementCartItemQuantity(dish_id)}
              >
                +
              </button>
            </div>

            <p>
              Price : {price} {dish_currency}
            </p>
            <button onClick={() => removeCartItem(dish_id)}>Remove</button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
