/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {config} from '../../constants/config';
//import avt from "../../public/assets/img/avt.jpg";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div
          id="postoverlay"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 2,
            display: "none"
          }}
        ></div>

        <div class="d-block" id="navbar">
          <nav
            class="navbar navbar-light navbar-expand-md navigation-clean"
            style={{
              backgroundColor: "#ff7d01",
              height: "45px",
              paddingBottom: "0px",
              paddingTop: "0px"
            }}
          >
            <div class="container">
              <a
                class="navbar-brand float-left"
                style={{
                  color: "#ffffff",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  paddingTop: "0px",
                  paddingBottom: "0px"
                }}
              >
                EVN
              </a>
              <div class="float-left d-xl-flex align-items-xl-center">
                <input type="text" id="inputSearch" placeholder="Tìm kiếm" />
              </div>
              <div
                class="collapse navbar-collapse d-sm-none d-md-none d-lg-none"
                id="navcol-1"
              >
                <ul class="nav navbar-nav d-xl-flex ml-auto align-items-xl-center">
                  <li
                    class="nav-item d-lg-flex d-xl-flex align-items-lg-center align-items-xl-center"
                    role="presentation"
                  >
                    <img
                      class="float-left rounded-circle"
                      src={`${config.AVATAR_SERVER}/${this.props.username}`}
                      style={{ width: "30px", filter: "blur(0px)" }}
                    />
                    <a
                      class="nav-link active text-light float-left"
                      href="canhan.html"
                      style={{ paddingLeft: "5px" }}
                    >
                      Cá nhân
                    </a>
                  </li>
                  <li
                    class="nav-item d-lg-flex align-items-lg-center"
                    role="presentation"
                  >
                    <a class="nav-link text-light" href="canhan.html">
                      Trang chủ
                    </a>
                  </li>
                  <li
                    class="nav-item d-lg-flex d-xl-flex align-items-lg-center align-items-xl-center"
                    role="presentation"
                    style={{ fontSize: "20px", height: "40px" }}
                  >
                    <a
                      class="nav-link float-left d-lg-flex align-items-lg-center"
                      href="#"
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        paddingRight: "10px",
                        paddingLeft: "0px"
                      }}
                    >
                      <i class="fa fa-bell-o" style={{ padding: "5px" }}></i>
                    </a>
                    <a
                      class="nav-link float-left d-lg-flex align-items-lg-center"
                      href="#"
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        paddingRight: "10px",
                        paddingLeft: "0px"
                      }}
                    >
                      <i class="fa fa-calendar" style={{ padding: "5px" }}></i>
                    </a>
                    <a
                      class="nav-link float-left d-lg-flex align-items-lg-center"
                      href="#"
                      style={{ padding: "0px" }}
                    >
                      <i class="fa fa-th-list" style={{ padding: "5px" }}></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
