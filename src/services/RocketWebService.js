import Axios from "axios";
import { config } from "../constants/config";

export async function markAsRead(roomId) {
  return Axios({
    url: `${config.RESTFUL_API_SERVER}/subscriptions.read`,
    headers: {
      "X-Auth-Token": localStorage.getItem("authToken"),
      "X-User-Id": localStorage.getItem("userId"),
      "Content-Type": "application/json"
    },
    data: {
      rid: roomId
    },
    method: "post"
  }).catch(err => {
    console.log(err);
  });
}

export async function register(body) {
  Axios({
    method: "POST",
    url: `${config.RESTFUL_API_SERVER}/users.register`,
    data: {
      username: body.username,
      pass: body.password,
      name: body.name,
      email: body.email
    },
    headers: {
      "Content-type": "application/json",
    }
  });
}
