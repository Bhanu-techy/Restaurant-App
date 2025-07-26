import {Component} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

class Card extends Component {
  static contextType = CartContext

  state = {data: this.props.data, count: 0}

  onClickPlus = () => {
    const {data, count} = this.state
    console.log(data)
    const {addCartItem} = this.context
    addCartItem({...data, count})
  }

  onClickPlusbtn = () => {
    this.onClickPlus()

    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onClickMinusbtn = () => {
    const {data, count} = this.state

    const {removeCartItem} = this.context

    removeCartItem(data)

    if (count > 0) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  render() {
    const {data, count} = this.state

    const {
      dish_name,
      dish_calories,
      dish_description,
      dish_currency,
      dish_price,
      dish_image,
      dish_Availability,
      addonCat = [],
      nexturl,
    } = data

    const addonview = addonCat.length === 0 && 'addoncss'

    return (
      <CartContext.Consumer>
        {value => {
          const {} = value
          return (
            <li className="card list-container">
              <div className="card-1">
                <img src={nexturl} alt="logo" />
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
                        onClick={this.onClickMinusbtn}
                      >
                        -
                      </button>
                      <p>{count}</p>
                      <button
                        type="button"
                        className="buttonsign"
                        onClick={this.onClickPlusbtn}
                      >
                        +
                      </button>
                    </div>

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
