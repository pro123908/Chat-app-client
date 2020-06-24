import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";
import ChatTemplate from "./Components/ChatTemplate";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chatTemplate" component={ChatTemplate} />
        <Route path="/chat" component={Chat} />
        <Route path="/" component={Join} />
      </Switch>
    </Router>
  );
};

export default App;
