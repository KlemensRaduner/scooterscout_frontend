import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import DecoratedRoute from "./decoratedRoute";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import SearchPage from "../pages/search";
import ScooterPage from "../pages/scooter";

const noaRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <DecoratedRoute exact path="/search" component={SearchPage} />
        <DecoratedRoute exact path="/sell" component={HomePage} />
        <DecoratedRoute exact path="/login" component={LoginPage} />
        <DecoratedRoute exact path="/scooter/:id" component={ScooterPage} />
        <DecoratedRoute exact path="/*" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};
export default noaRouter;
