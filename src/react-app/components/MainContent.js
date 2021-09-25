import React from "react";
import { Row } from "antd";
import { Route, Switch } from "react-router-dom";

import BaseContent from "../components/main-content/BaseContent";
import PageNotFound from "../components/common/error-pages/PageNotFound";

function MainContent() {
  return (
    <Route
      render={({ location }) => (
        <Row className="overflow-auto display-block">
          <Switch location={location}>
            <Route path="/" component={BaseContent} key="base" />
            <Route render={() => <PageNotFound />} key="notFound" />
          </Switch>
        </Row>
      )}
    />
  );
}

export default MainContent;
