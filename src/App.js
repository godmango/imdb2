import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import SearchPage from "./pages/SearchPage";
import MorePage from "./pages/MorePage";

function App() {
  return (
    <Router>
      <MyNav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/popular" component={PopularPage} />
        <Route exact path="/top_rated" component={TopRatedPage} />
        <Route
          exact
          path="/search/:keyword"
          component={SearchPage}
          // searchKeyWord={searchKeyWord}
        />
        <Route exact path="/more/:id" component={MorePage} />
      </Switch>
    </Router>
  );
}

export default App;
