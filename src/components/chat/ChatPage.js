/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Header from "../header/Header";
import Person from "./person/Person";
import "./ChatPage.css";
import Axios from "axios";
import { config } from "../../constants/config";
import ChatContent from "./chat-content/ChatContent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Socket from "../../services/WebSocket";
import { getID } from "../../constants/helper";
var socket = new Socket();
export default class ChatPage extends Component {
  constructor(props) {
    super();
    this.state = {
      conversationList: [],
      currentRoomId:"",
    };
    this.setUserStatus = this.setUserStatus.bind(this);
  }

  setUserStatus(status) {
    switch (status) {
      case 0:
        return "offline";
      case 1:
        return "online";
      case 2:
        return "away";
      default:
        return "busy";
    }
  }

  async componentDidMount() {
    // console.log(localStorage.getItem("authToken"));
    await Axios({
      method: "get",
      url: `${config.RESTFUL_API_SERVER}/users.list`,
      headers: {
        "X-Auth-Token": localStorage.getItem("authToken"),
        "X-User-Id": localStorage.getItem("userId")
      }
    })
      .then(res => {
        var users = [];
        res.data.users.forEach(user => {
          var person = {
            status: user.status,
            _id: user._id,
            rid: "",
            lastMessage: "",
            name: user.name,
            lastSeenTS: 0,
            lastMesTS: 0,
            username: user.username
          };
          users.push(person);
        });
        this.setState({
          conversationList: users
        });
        // console.log(this.state.conversationList);
      })
      .catch(err => {
        console.log(err);
      });

    socket.getAllRooms();
    socket.sendNotifyStream();
    socket.roomChanged(localStorage.getItem("userId"));
    socket.getSubscription();

    // Handle changes of user status
    socket.api.addEventListener("message", e => {
      var res = JSON.parse(e.data);
      if (res.msg === "changed" && res.fields.eventName === "user-status") {
        var username = res.fields.args[0][1];
        var status = res.fields.args[0][2];
        var userList = this.state.conversationList;

        userList.forEach(user => {
          if (user.username === username) {
            user.status = this.setUserStatus(status);
          }
        });

        this.setState({
          conversationList: userList
        });
      }

      //Get room Id and map to userId that this id connects to
      if (res.id === "getAllRooms") {
        var users = this.state.conversationList;
        res.result.update.forEach(room => {
          users.forEach(user => {
            if (
              getID(room._id) === user._id &&
              room.lastMessage !== undefined
            ) {
              user.rid = room._id;
              user.lastMessage = room.lastMessage.msg;
              user.lastMesTS = room.lastMessage.ts.$date
            }
          });
        });
        this.setState({
          conversationList: users
        });
        // console.log(this.state.conversationList);
      }

      // Handle incoming messages
      if (res.msg === "changed" && res.collection === "stream-notify-user") {
        if (res.fields.args[1].lastMessage !== undefined) {
          var currentUser = window.location.pathname.replace("/chat/", "");
          console.log(res.fields.args[1].lastMessage);
          let users = this.state.conversationList;
          users.forEach(user => {
            if (user.rid === res.fields.args[1]._id) {
              user.lastMessage = res.fields.args[1].lastMessage.msg;
              user.lastMesTS = res.fields.args[1].lastMessage.ts.$date;
            }
          });
          this.setState({
            conversationList: users
          });
        }
      }

      //
      if (res.id === "getSubscription") {
        users = this.state.conversationList;
        res.result.update.map(mes => {
          users.map(user => {
            if (mes.rid === user.rid) {
              user.lastSeenTS = mes.ls.$date;
            }
          });
        });
        this.setState({
          conversationList: users
        });
        console.log(this.state.conversationList);
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <div style={styles.container}>
            {/* {Chat list} */}
            <div
              class="card"
              style={{ border: "none", borderRadius: 0, width: "25%" }}
            >
              <div
                class="card-header"
                style={{ border: "0px", backgroundColor: "#fff" }}
              >
                <h5 class="mb-0" style={{ float: "left" }}>
                  Chat
                  <a class="float-right d-xl-none" id="closeListChat">
                    <i class="far fa-window-close"></i>
                  </a>
                </h5>
              </div>
              <div>
                <div class="card-body" id="bodyListChat">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend" style={{ width: "100%" }}>
                      <span
                        class="input-group-text"
                        style={styles.inputGroupSpan}
                      >
                        <i
                          className="fas fa-search"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        style={styles.inputSearch}
                        placeholder="Tìm kiếm"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div>
                      {this.state.conversationList.map(
                        (conversation, index) => {
                          return (
                            <div key={index}>
                              <Link
                                to={{
                                  pathname: `/chat/${conversation.username}`,
                                  state: {
                                    uid: conversation._id
                                  },
                                  
                                }}
                                
                              >
                                <Person
                                  username={conversation.username}
                                  name={conversation.name}
                                  lastMessage={conversation.lastMessage}
                                  status={conversation.status}
                                  unreadMsg={conversation.unreadMsg}
                                  seen={conversation.lastSeenTS>=conversation.lastMesTS}
                                />
                              </Link>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {Chat content} */}
            <Switch>
              <Route path="/chat/:id" component={ChatContent}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

let styles = {
  container: {
    marginTop: "46px",
    display: "flex",
    flexWrap: "wrap"
  },
  inputSearch: {
    backgroundColor: "#e9ecef",
    border: "0px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px"
  },
  inputGroupSpan: {
    border: "0px",
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
    paddingLeft: "15px"
  }
};
