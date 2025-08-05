import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {showSubmitErr: false, errMsg: '', username: '', password: ''}

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  submitErrorMsg = errMsg => {
    this.setState({showSubmitErr: true, errMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    console.log(data)
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitErrorMsg(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showSubmitErr, errMsg, username, password} = this.state

    return (
      <div className="login-container">
        <div className="login-img-container">
          <img
            src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1753886527/app-login-security-4897468-4077880_g6j6nh.webp"
            className="login-img"
            alt="website login"
          />
        </div>
        <form className="login-form-container" onSubmit={this.submitForm}>
          <div className="login-logo-containter">
            <img
              src="https://res.cloudinary.com/dya0bwju7/image/upload/v1749788026/Standard_Collection_8_ujpfzk.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="login-heading">Insta share</h1>
          </div>
          <div className="input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              className="login-input"
              value={username}
              onChange={this.onChangeName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              className="login-input"
              onChange={this.onChangePassword}
            />
            {showSubmitErr && <p className="error-msg">{errMsg}</p>}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
