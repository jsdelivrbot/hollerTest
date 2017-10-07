import React from 'react';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayForm: false,
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      formIsValid: true,
      formFeedback: ''
    }

    this.loginForm = this.loginForm.bind(this)
    this._loginFormIsValid = this._loginFormIsValid.bind(this)
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
        <div className={this.state.usernameError ? 'validation-feedback' : 'hidden'}>
          <em>{this.state.usernameError}</em>
        </div>
        <input
          type={displayForm ? 'text' : 'hidden'}
          placeholder="Password"
          className="text-field"
          value={this.state.password}
          onChange={e => this._handleChange(e.target.value, "password")}
        />
        <div className={this.state.passwordError ? 'validation-feedback' : 'hidden'}>
          <em>{this.state.passwordError}</em>
        </div>
        <div className={this.state.formIsValid ? 'success-feedback' : 'validation-feedback'}>
          <em>{this.state.formFeedback}</em>
        </div>

      </div>
    )
  }

  submitLoginForm() {
    this._resetFormFeedback();
    // 500ms timer to simulate API call
    setTimeout(
      this._loginFormIsValid()
    , 500);
  }

  _resetFormFeedback() {
    this.setState({
      formIsValid: false,
      formFeedback: ''
    })
  }

  _loginFormIsValid() {
    if(this._validateUsername() && this._validatePassword()) {
      //  format username for comparisson
      const reversedUsername = this.state.username.split("").reverse().join("")
      const alphanumericReversedUsername = reversedUsername.replace(/[^a-z0-9]+/gi, '');
      //  format password for comparisson
      const alphanumericPassword = this.state.password.replace(/[^a-z0-9]+/gi, '')
      const isAlphanumericallyMatched = alphanumericPassword.toLowerCase() === alphanumericReversedUsername.toLowerCase();

      if(isAlphanumericallyMatched) {
        this.setState({
          formIsValid: true,
          formFeedback: 'Success'
        })
        return true;
      } else {
        this.setState({
          formIsValid: false,
          formFeedback:  'The username and password do not match'
        });
        return false;
      }
    }
  }
  _validateUsername() {
    if (this.state.username.length > 3) {
      this.setState({ usernameError: ''})
      return true;
    }
    this.setState({ usernameError: 'Username must contain at least 4 characters'})
    return false;
  }

  _validatePassword() {
    if(this._validatePasswordLength() && this._validatePasswordCharacters()) {
      return true;
    }
    return false;
  }

  _validatePasswordLength() {
    if(this.state.password.length > 3) {
      this.setState({ passwordError: ''});
      return true;
    }
    this.setState({ passwordError: 'Password must contain at least 4 characters' })
    return false;
  }

  _validatePasswordCharacters() {
    if(/.*[0-9!@#$%^&*()=+\-_,.;'\[\]<>?:"|{}/\\]/.test(this.state.password)) {
      this.setState({ passwordError: ''})
      return true;
    } else {
      this.setState({ passwordError: 'Password must contain one number or symbol' })
      console.log('Password does not have chars')
      return false;
    }
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
