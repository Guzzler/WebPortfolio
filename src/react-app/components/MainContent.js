import React from "react";
import { Row } from "antd";
import { Route, Switch } from "react-router-dom";

import BaseContent from "../components/main-content/BaseContent";
import BlogList from "../components/blog/BlogList";
import BlogPost from "../components/blog/BlogPost";
import PageNotFound from "../components/common/error-pages/PageNotFound";

function MainContent() {
  return (
    <Route
      render={({ location }) => (
        <Row className="display-block">
          <Switch location={location}>
            <Route path="/blog/:slug" component={BlogPost} key="blogPost" />
            <Route path="/blog" exact component={BlogList} key="blogList" />
            <Route path="/" exact component={BaseContent} key="base" />
            <Route render={() => <PageNotFound />} key="notFound" />
          </Switch>
        </Row>
      )}
    />
  );
}

export default MainContent;
