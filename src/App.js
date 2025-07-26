import {Component} from 'react'
import Home from './components/Home'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = data => {
    this.setState(prevState => {
      const existing = prevState.cartList.find(item => item.id === data.id)
      if (existing) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === data.id ? {...item, count: item.count + 1} : item,
          ),
        }
      }
      return {cartList: [...prevState.cartList, {...data, count: 1}]}
    })
  }

  removeCartItem = item => {
    this.setState(prevState => {
      const upadatedCart = prevState.cartList
        .map(each => {
          if (each.id === item.id) {
            if (each.count > 1) {
              return {...each, count: each.count - 1}
            }
            return null
          }
          return each
        })
        .filter(item => item !== null)
      return {cartList: upadatedCart}
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }
}

export default App
