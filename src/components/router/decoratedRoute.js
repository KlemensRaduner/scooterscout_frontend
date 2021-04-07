import React from "react";
import { Route } from "react-router-dom";
import MainPage from "./mainPage";

function DecoratedRoute({ component, ...rest }) {
  return <Route {...rest} render={(routeProps) => <MainPage {...routeProps} component={component} />} />;
}

export default DecoratedRoute;
