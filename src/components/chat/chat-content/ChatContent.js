/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import ChatInput from "../chat-input/ChatInput";
import Message from "../message/Message";
import { config } from "../../../constants/config";
import Socket from "../../../services/WebSocket";
import { Container, Row, Col, Image } from "react-bootstrap";

var socket = new Socket();
export default class ChatContent extends Component {
  constructor(props) {
    super();
    this.state = {
      msg: [],
      roomId: ""
    };
  }

  subscribeToServer(uid) {
    var createRoomRequest = {
      msg: "method",
      method: "createDirectMessage",
      id: `createRoomTo${uid}`,
      params: [uid]
    };
    socket.api.send(JSON.stringify(createRoomRequest));

    socket.api.addEventListener("message", e => {
      var res = JSON.parse(e.data);

      //get/create RoomId
      if (res.id === `createRoomTo${uid}`) {
        var loadHistory = {
          msg: "method",
          method: "loadHistory",
          id: `loadHistory${localStorage.getItem("userId")}`,
          params: [res.result.rid, null, 20, 0]
        };
        var streamRoomMessage = {
          msg: "sub",
          id: `streamRoomMessageFor${res.result.rid}`,
          name: "stream-room-messages",
          params: [res.result.rid, false]
        };
        socket.api.send(JSON.stringify(loadHistory));
        socket.api.send(JSON.stringify(streamRoomMessage));
        this.setState({
          roomId: res.result.rid
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.subscribeToServer(nextProps.match.params.id);
    }
    return true;
  }

  componentDidMount() {
    this.subscribeToServer(this.props.match.params.id);
    socket.api.addEventListener("message", e => {
      var res = JSON.parse(e.data);

      //Load message history
      if (res.id === `loadHistory${localStorage.getItem("userId")}`) {
        var messages = [];
        res.result.messages.forEach(msg => {
          messages.unshift({
            msg: msg.msg,
            owner: msg.u.username
          });
        });
        this.setState({
          msg: messages
        });
      }

      //handle rereiving messages
      if (res.msg === "changed" && res.collection === "stream-room-messages") {
        var msg = res.fields.args[0].msg;
        var owner = res.fields.args[0].u.username;
        var messages = this.state.msg;
        messages.push({ msg, owner });
        this.setState({ msg: messages });
      }
    });
  }
  render() {
    return (
      <div
        class="col"
        id="chatContent"
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <div
          class="card"
          id="panelChatContent"
          style={{ borderRadius: 0, height: "100%" }}
        >
          <div class="card-header">
            <h5 class="mb-0">
              <a class="float-right d-xl-none" id="menuLisetChat" href="#">
                <i class="fa fa-th-list" />
              </a>
              <img
                class="rounded-circle"
                src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                style={{ width: "30px", marginRight: "10px" }}
              />
              {this.props.match.params.id}
            </h5>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
            {/* {Chat frame} */}
            <div
              class="col"
              style={{
                position: "relative",
                padding: "0px",
                height: "100%"
              }}
            >
              <div style={{ overflowY: "scroll", height: "500px" }}>
                {this.state.msg.map((msg, index) => {
                  return (
                    <Message
                      msg={msg.msg}
                      key={index}
                      owner={msg.owner}
                    ></Message>
                  );
                })}
              </div>

              <ChatInput roomId={this.state.roomId}></ChatInput>
            </div>
            {/* {Information panel on the right} */}
            <div
              class="col-xl-4 d-none d-xl-block"
              style={{ borderLeft: "1px solid rgba(0,0,0,.125)" }}
            >
              <div>
                <div class="d-xl-flex justify-content-xl-center align-items-xl-center information-panel">
                  <img
                    class="rounded-circle"
                    src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                    style={{ width: "40%" }}
                  />
                </div>
                <div class="d-xl-flex justify-content-xl-center align-items-xl-center">
                  <h5 style={{ marginBottom: "0px" }}>
                    {this.props.match.params.id}
                  </h5>
                </div>
                <div class="d-xl-flex justify-content-xl-center align-items-xl-center">
                  <label style={{ fontSize: "14px" }}>
                    Chuyên viên - GPQTDN
                  </label>
                </div>
              </div>
              <div>
                <div class="panel-group">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h6 class="panel-title">
                        <a href="#collapse1" data-toggle="collapse">
                          <h5>TUỲ CHỌN</h5>
                        </a>
                      </h6>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse in">
                      <div class="panel-body">
                        <ul>
                          <p>Đặt biệt danh</p>
                          <p>Tìm tin nhắn</p>
                          <p>Đổi emoji icon</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h6 class="panel-title">
                        <a href="#collapse2" data-toggle="collapse">
                          <h5>QUYỀN RIÊNG TƯ &amp; HỖ TRỢ</h5>
                        </a>
                      </h6>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse in">
                      <div class="panel-body">
                        <p>Thông báo</p>
                        <p>Chặn luôn</p>
                        <p>Báo cáo</p>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h6 class="panel-title">
                        <a href="#collapse3" data-toggle="collapse">
                          <h5> TỆP TIN ĐÃ CHIA SẼ</h5>
                        </a>
                      </h6>
                    </div>
                    <div id="collapse3" class="panel-collapse collapse in">
                      <div class="panel-body">
                        <p>Thông báo</p>
                        <p>Chặn luôn</p>
                        <p>Báo cáo</p>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h6 class="panel-title">
                        <a href="#collapse4" data-toggle="collapse">
                          <h5>HÌNH ẢNH ĐÃ CHIA SẼ</h5>
                        </a>
                      </h6>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse in">
                      <div class="panel-body" style = {{marginTop: "20px"}}>
                        <Container>
                          <Row>
                            <Col xs={6} md={4}>
                              <Image
                                src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                                rounded
                              />
                            </Col>
                            <Col xs={6} md={4}>
                              <Image
                                src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                                rounded
                              />
                            </Col>
                            <Col xs={6} md={4}>
                              <Image
                                src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                                rounded
                              />
                            </Col>
                            <Col xs={6} md={4} style = {{marginTop:"20px"}}>
                              <Image
                                src={`${config.AVATAR_SERVER}/${this.props.match.params.id}`}
                                rounded
                              />
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
