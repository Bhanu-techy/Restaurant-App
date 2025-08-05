import {Component} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

class Card extends Component {
  state = {count: 0}

  onClickPlusBtn = () => {
    const {count} = this.state
    console.log(count)
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onClickMinusBtn = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  render() {
    const {count} = this.state
    const {data} = this.props
    const {
      dish_name,
      dish_id,
      dish_calories,
      dish_description,
      dish_currency,
      dish_price,
      dish_image,
      dish_Availability,
      addonCat = [],
    } = data

    const addonview = addonCat.length === 0 ? 'addoncss' : ''

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onClickAddToCart = () => {
            addCartItem({...data, count})
          }
          return (
            <li className="card list-container">
              <div className="card-1">
                <h1 className="dish-name">{dish_name}</h1>
                <p className="currency">
                  {dish_currency} {dish_price}
                </p>
                <p className="description">{dish_description}</p>
                {dish_Availability ? (
                  <>
                    <div className="button-div">
                      <button
                        type="button"
                        className="buttonsign"
                        onClick={this.onClickMinusBtn}
                      >
                        -
                      </button>
                      <p className="count">{count}</p>
                      <button
                        type="button"
                        className="buttonsign"
                        onClick={this.onClickPlusBtn}
                      >
                        +
                      </button>
                    </div>
                    {count > 0 && (
                      <button
                        type="button"
                        onClick={onClickAddToCart}
                        className="add-cart-btn"
                      >
                        ADD TO CART
                      </button>
                    )}
                    <p className={`addonCat ${addonview}`}>
                      Customizations availabile
                    </p>
                  </>
                ) : (
                  <p className="not-available">Not available</p>
                )}
              </div>
              <div className="card-2">
                <p className="calories">{dish_calories} calories</p>
                <img src={dish_image} alt={dish_name} className="dishimg" />
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Card
