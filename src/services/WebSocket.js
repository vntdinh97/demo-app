import { config } from "../constants/config";

export default class Socket {
  api = new WebSocket(config.REALTIME_API_SERVER);
  constructor() {
    if (!!Socket.instance) {
      return Socket.instance;
    }
    Socket.instance = this;
    this.api.onopen = () => {
      this.connect();
      this.pong();
      // if (localStorage.getItem("authToken")!==null) {
      //   this.login(localStorage.getItem("authToken"));
      // }
      
    };
    
    
    return this;
  }

  pong() {
    this.api.addEventListener("message", function(e) {
      var res = JSON.parse(e.data);
      // Repsonse pong to server ping
      if (res.msg === "ping") {
        var responsePong = {
          msg: "pong"
        };
        this.send(JSON.stringify(responsePong));
      }

      // // save autoToken to localstorage
      // if (res.id === "login"){
      //   localStorage.setItem("authToken",res.result.token);
      // }

    });
  }

  connect() {
    var connectRequest = {
      msg: "connect",
      version: "1",
      support: ["1"]
    };
    // var tokenFromStorage = localStorage.getItem("authToken");
    // var loginRequest = {
    //   msg: "method",
    //   method: "login",
    //   id: "login",
    //   params: [
    //     {
    //       resume: tokenFromStorage
    //     }
    //   ]
    // };
    // this.api.onopen = () => {
      this.api.send(JSON.stringify(connectRequest));
      // this.api.send(JSON.stringify(loginRequest));
    // };
  }

  login(authToken){
    var loginRequest = {
      msg: "method",
      method: "login",
      id: "login",
      params: [
        {
          resume: authToken
        }
      ]
    };
    this.api.send(JSON.stringify(loginRequest));
  }

  sendNotifyStream() {
    var notifyLoginRequest = {
      msg: "sub",
      id: "stream-notify-logged",
      name: "stream-notify-logged",
      params: [
        "user-status",
        {
          useCollection: false,
          args: []
        }
      ]
    };
    this.api.send(JSON.stringify(notifyLoginRequest));
  }

  sendMessage(_id, rid, msg) {
    var sendMessageRequest = {
      msg: "method",
      method: "sendMessage",
      id: `${_id}sendsMessageTo${rid}`,
      params: [
        {
          _id: _id,
          rid: rid,
          msg: msg
        }
      ]
    };
    this.api.send(JSON.stringify(sendMessageRequest));
  }

  getAllRooms() {
    var getAllRoomsRequest = {
      msg: "method",
      method: "rooms/get",
      id: "getAllRooms",
      params: [{ $date: 0 }]
    };
    this.api.send(JSON.stringify(getAllRoomsRequest));
  }

  roomChanged(uid) {
    var roomChangedRequest = {
      msg: "sub",
      id: "roomChanged",
      name: "stream-notify-user",
      params: [`${uid}/rooms-changed`, false]
    };
    this.api.send(JSON.stringify(roomChangedRequest));
  }

  getSubscription() {
    var getSubscriptionRequest = {
      msg: "method",
      method: "subscriptions/get",
      id: "getSubscription",
      params: [{ $date: 0 }]
    };
    this.api.send(JSON.stringify(getSubscriptionRequest));
  }

  readMessage(roomId) {
    var readMessageRequest = {
      msg: "method",
      method: "readMessages",
      params: [roomId],
      id: "readMessage"
    };
    this.api.send(JSON.stringify(readMessageRequest));
  }
}
