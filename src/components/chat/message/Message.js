import React from "react";
import "./Message.css";

const Message = props => {
  var username = localStorage.getItem("username");
  let styles = {
    away: {
      float: username === props.owner ? "right" : "left"
    }
  };
  return (
    <div className="container-send-message ">
      <p className="send-body" style={styles.away}>
        {props.msg}
      </p>
    </div>
  );
};

export default Message;
