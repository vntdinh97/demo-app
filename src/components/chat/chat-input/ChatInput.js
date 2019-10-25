/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import './ChatInput.css'
import Socket from "../../../services/WebSocket";
import {makeID} from '../../../constants/helper';
var socket = new Socket();
export default class ChatInput extends Component {
  constructor(props){
    super();
    this.state = {
      msg : "",
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      msg:e.target.value
    })
  }

  async handleEnter(e) {
    if (e.key === "Enter") {
      makeID(10);
      socket.sendMessage(makeID(10),this.props.roomId,this.state.msg);
      this.setState({
        msg:"",
      })
    }
    
  }

  render() {
    return (
      <div className="chat-input-div">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              style={{
                borderRadius: "0px",
                border: "0px",
                backgroundColor: "#fff"
              }}
            >
              <a href="#">
                <i class="fas fa-th chat-input-icon"></i>
              </a>
              <a href="#">
                <i class="fas fa-camera chat-input-icon"></i>
              </a>
              <a href="#">
                <i class="fas fa-image chat-input-icon"></i>
              </a>
              <a href="#">
                <i class="fas fa fa-paperclip chat-input-icon"></i>
              </a>
              <a href="#">
                <i class="fas fa fa-microphone chat-input-icon"></i>
              </a>
            </span>
          </div>
          <input
            type="text"
            class="form-control input"
            placeholder="Tâm sự nào..."
            style = {{border: 0, borderTopLeftRadius: "25px", borderBottomLeftRadius:"25px"}}
            value = {this.state.msg}
            onChange = {this.handleChange}
            onKeyPress = {this.handleEnter}
          />
            <div class="input-group-append">
              <span
                class="input-group-text"
                style={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  border: "0px"
                }}
              >
                <a href="#">
                  <i class="fas fa-grin" style={{ fontSize: "20px" }}></i>
                </a>
              </span>
              <span
                class="input-group-text"
                style={{
                  backgroundColor: "#fff",
                  border: "0px",
                  marginLeft: "0px"
                }}
              >
                <a href="#">
                  <i class="fas fa-thumbs-up" style={{ fontSize: "20px" }}></i>
                </a>
              </span>
            </div>
          
        </div>
      </div>
    );
  }
}
