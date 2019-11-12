/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./main.css";
import "./util.css";
import {sha256} from 'js-sha256';
import Socket from '../../services/WebSocket';
import { login as HRMSLogin } from "../../services/HRMSWebService";
import { register } from "../../services/RocketWebService";

var socket = new Socket();
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
    let data;
    HRMSLogin(this.state.username,this.state.password).then(res => {
      data = res.data;
      console.log(data);
      socket.login(sha256(data.user));
    }).catch(err => {
      console.log(err);
      alert("Wrong password!");
    })
      socket.api.addEventListener("message", (e) => {
        var response = JSON.parse(e.data);
        if (response.msg === "result" && response.error !== undefined && response.error.error === 403) {
          var body = {
            username: data.user,
            email:`${data.user}@example.com`,
            password:this.state.password, 
            name: data.hoten === null ? data.user : data.hoten
          }
          register(body).then(() => {
          }).catch(err => {
            console.log(err);
          });
          socket.login(sha256(data.user));
        }

        if (response.msg === "result" && response.id === "login" && response.error === undefined){
          localStorage.setItem("userId",response.result.id);
          localStorage.setItem("authToken",response.result.token)
          this.props.history.push("/chat");
        }

      })
      
      // this.props.history.push("/chat");
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
