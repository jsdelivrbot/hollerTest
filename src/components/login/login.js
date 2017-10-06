import React from 'react';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayForm: false,
      username: '',
      password: ''
    }

    this.loginForm = this.loginForm.bind(this)
  }

  showForm() {
    this.setState({ displayForm: true });
  }

  _handleChange(value, origin) {
    this.setState({ [origin]: value})
  }

  loginForm() {
    const displayForm = this.state.displayForm;
    return (
      <div className={displayForm ? 'displayed-form' : 'hidden-form'}>
        <input
          type={displayForm ? 'text' : 'hidden'}
          placeholder="Username"
          className="text-field"
          value={this.state.username}
          onChange={e => this._handleChange(e.target.value, "username")}
        />
        <input
          type={displayForm ? 'text' : 'hidden'}
          placeholder="Password"
          className="text-field"
          value={this.state.password}
          onChange={e => this._handleChange(e.target.value, "password")}
        />
      </div>
    )
  }

  // validateLoginForm() {
  //   if(this._validateUsername() )
  // }

  _validateUsername() {
    return this.state.username.length > 3;
  }

  _validatePassword() {
    const reversedUsername = this.state.username.split("").reverse().join("")
    const alphanumericReversedUsername = reversedUsername.replace(/[^a-z0-9+]+/gi, '')

    const alphanumericPassword = this.state.password.replace(/[^a-z0-9+]+/gi, '')
    return alphanumericPassword.toLowerCase() === alphanumericReversedUsername.toLowerCase()
  }

  submitLoginForm() {
    // this.validateLoginForm()
    // console.log('username valid?', this._validateUsername())
    // console.log('password valid?', this._validatePassword())
    console.log('submission valid?', this._validateUsername() && this._validatePassword())

  }

  loginButtonControl() {
    if (!this.state.displayForm) {
      this.showForm();
    } else {
      this.submitLoginForm()
    }
  }

  render() {
    return (
      <div className="row">
        <div className="login-container">
          <h3>Holler Frontend Technical Test</h3>
          <hr />
          {this.loginForm()}
          <div className="button-container">
            <button
              className="btn btn-lg btn-primary"
              onClick={() => this.loginButtonControl()}
              >
                Login
              </button>
          </div>
        </div>
      </div>
    );
  }
}
