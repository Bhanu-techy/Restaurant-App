import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <>
            <nav>
              <Link to="/" className="link">
                <h1 className="heading">UNI Resto Cafe</h1>
              </Link>
              <div className="cart-div">
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
                <p>My orders</p>
                <Link to="/cart">
                  <button
                    className="cart-button"
                    type="button"
                    data-testid="cart"
                  >
                    <span className="cart-num">{cartList.length}</span>
                    <AiOutlineShoppingCart size={60} className="icon" />
                  </button>
                </Link>
              </div>
            </nav>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
