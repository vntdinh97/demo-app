import { HRMSconfig } from "../constants/config";
import Axios from "axios";

export async function login(username, password) {
  return Axios({
    method: "POST",
    url: `${HRMSconfig.API_SERVER}/adminService/login`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    },
    data: {
      user: username.replace("\\","\\\\"),
      pass: password
    }
  });
}
