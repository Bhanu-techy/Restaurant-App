import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Card from '../Card'

import './index.css'

const apiStatusConstants = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {details: {}, category: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const headers = {
      method: 'GET',
    }
    const response = await fetch(url, headers)
    const data = await response.json()

    /* const updatedData = data[0].table_menu_list.map(item =>
      item.category_dishes.map(each => ({...each, count: 0})),
*/

    const updatedData = data[0].table_menu_list.map(each => ({
      categoryDishes: each.category_dishes.map(item => ({
        dishName: item.dish_name,
        dishId: item.dish_id,
        dishCalories: item.dish_calories,
        dishDescription: item.dish_description,
        dishCurrency: item.dish_currency,
        dishPrice: item.dish_price,
        dishImage: item.dish_image,
        dishAvailability: item.dish_Availability,
        addonCat: item.addonCat,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
    }))

    console.log(updatedData[0])

    if (response.ok) {
      this.setState({
        details: updatedData,
        category: updatedData[0],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickCategory = event => {
    this.setState({category: event})
  }

  renderSuccessView = () => {
    const {details, category} = this.state

    const {categoryDishes = []} = category
    const {menuCategoryId} = category

    return (
      <div>
        <div className="header">
          <ul className="header-list">
            {details.map(each => (
              <li key={each.menuCategoryId}>
                <button
                  type="button"
                  onClick={() => this.onClickCategory(each)}
                  className={`categorybtn ${
                    menuCategoryId === each.menuCategoryId ? 'activeCss' : ''
                  }`}
                >
                  {each.menuCategory}
                </button>
                <hr
                  className={
                    menuCategoryId === each.menuCategoryId
                      ? 'activeCssLine'
                      : ''
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <ul className="dish-list">
          {categoryDishes.map(each => (
            <Card data={each} key={each.dishId} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <h1>Page Not Found</h1>
      <p>We could not found your request, please try again</p>
      <button type="button" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="failure-view">
      <Loader type="ThreeDots" color="#0000000" height="50" width="50" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderResultView()}
      </>
    )
  }
}
export default Home
