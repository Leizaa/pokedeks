import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import detail from "./pages/pokemondetails/react/detail";
import home from "./pages/pokelist/react/home";

class App extends React.Component {
  state = {};

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/detail" component={detail} />
        </Switch>
      </Router>
    );
  }
}

export default App;
