/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Header from "../header/Header";

export default class NewFeed extends Component {
  render() {
    return (
      <div>
        <Header />
        <div class="container" style={{ marginTop: "47px" }}>
          <div class="row">
            <div
              class="col-xl-2 d-none d-xl-block"
              style={{
                marginTop: "10px",
                paddingRight: "0px",
                paddingLeft: "0px",
                marginRight: "10px"
              }}
            >
              <div class="card shadow mt-2" style={{ width: "100%" }}>
                <div
                  style={{ backgroundColor: "#ff7d01", height: "50px" }}
                ></div>
                <div class="text-center">
                  <img
                    class="rounded-circle img-fluid bg-white border border-white shadow"
                    src="assets/img/avt.jpg"
                    style={{
                      width: "80px",
                      marginTop: "-40px",
                      filter: "blur(0px)"
                    }}
                  />
                </div>
                <div class="card-body">
                  <h4
                    class="d-xl-flex justify-content-xl-center card-title hSizeCont"
                    style={{ fontSize: "18px", marginBottom: "0px" }}
                  >
                    Võ Nguyên Thiên Định
                  </h4>
                  <p
                    class="d-xl-flex justify-content-xl-center"
                    style={{ fontSize: "14px", marginBottom: "0px" }}
                  >
                    Chuyên viên&nbsp;
                  </p>
                  <p
                    class="d-xl-flex justify-content-xl-center"
                    style={{ fontSize: "14px" }}
                  >
                    QTDN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
