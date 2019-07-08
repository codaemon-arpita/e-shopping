/**
 *
 * LoginForm
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


import {loginRequest} from './actions';
import Notifications from '../../components/Notifications';

const LoginField = styled(Field)`
  display: block;
  width: 100%;
  margin: 0px 0px 15px;
`;

const PasswordLink = styled(Link)`
  font-size: 18px;
`;

// const recaptchaKey = process.env.NODE_ENV === 'production' ? RECAPTCHA_KEY_PROD : RECAPTCHA_KEY_DEV;

const LoginContainer = styled.div`
  .login {
    background: ${ /* istanbul ignore next */ props => props.theme.loginBlue}
  }
  h1 {
    margin: 0px 0px 30px;
    color: ${ /* istanbul ignore next */ props => props.theme.lightPurple};
  }

  .ownerly-form {
    padding-bottom: 90px;
  }

  .logo svg {
    height: 41px;
  }

  .loginErrorMessage{
    .account-messages ul li {
      color: ${ /* istanbul ignore next */ props => props.theme.black};
    }
  }

  @media ${ /* istanbul ignore next */ props => props.theme.maxTablet} {
    .login {
      padding-top: 60px;
    }
    .ownerly-form {
      padding-bottom: 80px;
    }
  }
  @media ${ /* istanbul ignore next */ props => props.theme.maxPhablet} {
    .login {
      padding-top: 20px;
    }
    .logo svg {
      height: 37px;
    }
    .ownerly-form {
      padding-bottom: 60px;
    }
  }
`;

export class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  };

  submit = values => {
    this.props.loginRequest(values);
  };

  render() {
    // also have successful
    const {
      handleSubmit,
      login: { requesting, messages, errors, successful },
    } = this.props;

    let loginErrorMessage = "";

    if (this.props.login.errors.length) {
      loginErrorMessage = "loginErrorMessage";
    }

    return (
      <LoginContainer>
        <div className="login">
          <div className="container">
            <form onSubmit={handleSubmit(this.submit)}>
              <h1>Log in to your account</h1>
              <div className={loginErrorMessage}>
                <Notifications
                  requesting={requesting}
                  successful={successful}
                  messages={messages}
                  errors={errors}
                  />
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                  <LoginField
                    name="email"
                    type="text"
                    id="email"
                    className="email"
                    component="input"
                    placeholder="Email Address"
                  />
                  <LoginField
                    name="password"
                    type="password"
                    id="password"
                    className="password"
                    component="input"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
              <div className="row">
                <PasswordLink to="/reset-password-request" onClick={this.sendForgotPasswordClick}>Forgot Password?</PasswordLink>
              </div>
            </form>

          </div>
        </div>
      </LoginContainer>
    );
  }
}

const mapStateToProps = state => ({ login: state.login });

const connected = connect(
  mapStateToProps,
  { loginRequest },
)(Login);

export default reduxForm({
  form: 'login',
})(connected);
