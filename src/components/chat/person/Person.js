/* eslint-disable jsx-a11y/alt-text */
import React, { PureComponent } from "react";
import { config } from "../../../constants/config";
export default class Person extends PureComponent {
  render() {
    console.log(this.props.username + "\t" + this.props.seen);
    const avt = `${config.AVATAR_SERVER}/${this.props.username}`;
    return (
      <div>
        <div class="float-left" style={{ width: "90%", marginBottom: "10px" }}>
          <img
            class="float-left rounded-circle"
            src={avt}
            style={{ width: "15%", filter: "blur(0px)" }}
          />
          <div class="float-left" style={{ paddingLeft: "10px", width: "85%" }}>
            <h1 style={{ fontSize: "14px", marginBottom: "0px", color: this.props.seen ? "black" : "red"}}>
              {this.props.name}
            </h1>
            <div
              class="d-xl-flex justify-content-xl-start align-items-xl-center"
              style={{ width: "100%", color: "#999999" }}
            >
              <span
                class="float-left"
                style={{
                  width: "80%",
                  fontSize: "14px",
                  textOverflow: "clip",
                  whiteSpace: "nowrap",
                  overflowX: "hidden",
                  fontWeight: this.props.seen ? "normal" : "900"
                }}
              >
                {this.props.lastMessage}
                <br />
              </span>
              <small
                class="float-right d-xl-flex justify-content-xl-end"
                style={{ width: "20%" }}
              >
                {this.props.lastTime}
              </small>
            </div>
          </div>
        </div>
        <div class="float-right" style={{ width: "10%" }}>
          <i
            class="la la-user"
            style={{
              fontSize: "30px",
              color:
                this.props.status === "online"
                  ? "#0ecc0e"
                  : this.props.status === "offline"
                  ? "#868786"
                  : this.props.status === "away"
                  ? "#FF7D01"
                  : "#fc0303"
            }}
          ></i>
        </div>
      </div>
    );
  }
}
