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

    /*const updatedData = data[0].table_menu_list.map(item =>
      item.category_dishes.map(each => ({...each, count: 0})),
*/

    if (response.ok) {
      this.setState({
        details: data[0],
        category: data[0].table_menu_list[0],
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
    const {table_menu_list = []} = details
    const {category_dishes = []} = category
    const {menu_category_id} = category

    return (
      <div>
        <div className="header">
          <ul className="header-list">
            {table_menu_list.map(each => (
              <li key={each.menu_category_id}>
                <button
                  type="button"
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
        <ul className="dish-list">
          {category_dishes.map(each => (
            <Card data={each} key={each.dish_id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="failure-view">
        <h1>Page Not Found</h1>
        <p>We could not found your request, please try again</p>
        <button type="button" onClick={this.getDetails}>
          Retry
        </button>
      </div>
    )
  }

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
