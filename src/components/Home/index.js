import {Component} from 'react'
import Header from '../Header'
import Card from '../Card'
import CartContext from '../../context/CartContext'

import './index.css'

class Home extends Component {
  state = {details: [], category: []}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const headers = {
      method: 'GET',
    }
    const response = await fetch(url, headers)
    const data = await response.json()

    console.log(data)
    if (response.ok) {
      this.setState({details: data[0], category: data[0].table_menu_list[0]})
    }
  }

  onClickCategory = event => {
    this.setState({category: event})
  }

  render() {
    const {details, category} = this.state
    const {table_menu_list = []} = details
    const {category_dishes = []} = category
    const {menu_category_id} = category

    return (
      <CartContext.Consumer>
        {value => {
          return (
            <>
              <Header />
              <div>
                <div className='header'>
                  <ul className='header-list'>
                    {table_menu_list.map(each => (
                      <li key={each.menu_category_id}>
                        <button
                          type='button'
                          onClick={() => this.onClickCategory(each)}
                          className={`categorybtn ${
                            menu_category_id === each.menu_category_id
                              ? 'activeCss'
                              : ''
                          }`}
                        >
                          {each.menu_category}
                        </button>
                        <hr
                          className={
                            menu_category_id === each.menu_category_id
                              ? 'activeCssLine'
                              : ''
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className='dish-list'>
                  {category_dishes.map(each => (
                    <Card data={each} key={each.dish_id} />
                  ))}
                </ul>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Home
