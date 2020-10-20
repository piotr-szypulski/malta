import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import List from "Components/list";
import Update from "Components/update";
import { StateProvider } from "Store";
import "./css/main.sass";

const App = () => (
  <StateProvider>
    <Router>
      <Switch>
        <Route key="list" path="/" component={List} exact />
        <Route key="add" path="/add" component={Update} />
      </Switch>
    </Router>
  </StateProvider>
);

ReactDOM.render(<App />, document.querySelector("#app"));
