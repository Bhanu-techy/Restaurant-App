import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      console.log(cartList)

      return (
        <>
          <Header />
          <div className="cart-container">
            {cartList.length === 0 ? (
              <div className="cart-empty-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="cart empty"
                  className="empty-cart-img"
                />
                <h1>Your Cart is Empty</h1>
                <Link to="/">
                  <button type="button" className="logout-btn">
                    Order
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="cart-header">
                  <h1>Cart</h1>
                  <button type="button" onClick={removeAllCartItems}>
                    Remove All
                  </button>
                </div>
                <ul>
                  {cartList.map(item => (
                    <CartItem details={item} key={item.dishId} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
