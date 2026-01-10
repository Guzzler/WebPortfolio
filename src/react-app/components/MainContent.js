import React from "react";
import { Row } from "antd";
import { Route, Switch } from "react-router-dom";

import BaseContent from "../components/main-content/BaseContent";
import LifePlatformer from "../components/main-content/LifePlatformer";
import PageNotFound from "../components/common/error-pages/PageNotFound";

function MainContent() {
  return (
    <Route
      render={({ location }) => (
        <Row className="display-block">
          <Switch location={location}>
            <Route exact path="/" component={BaseContent} key="base" />
            <Route path="/life-game" component={LifePlatformer} key="life-game" />
            <Route render={() => <PageNotFound />} key="notFound" />
          </Switch>
        </Row>
      )}
    />
  );
}

export default MainContent;
