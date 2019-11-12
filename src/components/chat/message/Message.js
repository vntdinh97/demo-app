import React from "react";
import "./Message.css";
import { config } from "../../../constants/config";

const Message = props => {
  var username = localStorage.getItem("username");
  let styles = {
    away: {
      float: username === props.owner ? "right" : "left"
    }
  };
  if (props.attachment === undefined) {
    return (
      <div className="container-send-message ">
        <p className="send-body" style={styles.away}>
          {props.msg}
        </p>
      </div>
    );
  }
  var link = `${config.SERVER}${props.attachment[0].title_link}`;
  return (
    <div className="container-send-message ">
      <a href={link}>
        <p className="send-body" style={styles.away}>
          {props.attachment[0].title}
        </p>
      </a>
    </div>
  );
};

export default Message;
