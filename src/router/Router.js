import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Login from "../components/login/Login";
import ChatPage from "../components/chat/ChatPage";
// import ChatContent from "../components/chat/chat-content/ChatContent";
import PrivateRoute from './PrivateRoute';
export default function Routers() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        {/* <Route exact path="/chat" component={ChatPage} /> */}
        <PrivateRoute exact path = "/chat" component = {ChatPage}/>
        {/* <Switch>
          <Route path="/chat/:id" component={ChatContent} />
        </Switch> */}
      </div>
    </Router>
  );
}
