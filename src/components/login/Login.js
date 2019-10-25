/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./main.css";
import "./util.css";
import Axios from "axios";
import { config } from "../../constants/config";
import Socket from '../../services/WebSocket';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleLogin(event) {
    event.preventDefault();
    await Axios({
      method: "POST",
      url: `${config.RESTFUL_API_SERVER}/login`,
      data: {
        user: this.state.username,
        password: this.state.password
      },
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        localStorage.setItem("userId", res.data.data.userId);
        localStorage.setItem("authToken", res.data.data.authToken);
        localStorage.setItem("username",this.state.username);
        alert("Login successfully!");
        localStorage.setItem("loggedIn", true);
        
        var socket = new Socket();

        this.props.history.push("/chat");
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        {this.renderRedirect}
        <div class="limiter">
          <div class="container-login100 backgroundImg">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-49">Login</span>

                <div
                  class="wrap-input100 validate-input m-b-23"
                  data-validate="Username is required"
                >
                  <span class="label-input100">Username</span>
                  <input
                    class="input100"
                    type="text"
                    name="username"
                    placeholder="Type your username"
                    value={this.state.username}
                    onChange={this.handleOnChange}
                  />
                  <span class="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div
                  class="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span class="label-input100">Password</span>
                  <input
                    class="input100"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                  />
                  <span class="focus-input100" data-symbol="&#xf190;"></span>
                </div>

                <div class="text-right p-t-8 p-b-31">
                  <a href="#">Forgot password?</a>
                </div>

                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button
                      class="login100-form-btn"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>

                <div class="txt1 text-center p-t-54 p-b-20">
                  <span>Or Sign Up Using</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="dropDownSelect1"></div>
      </div>
    );
  }
}
