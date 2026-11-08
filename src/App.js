import "./styles/base.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./react-app/components/home/Home";
import BlogList from "./react-app/components/blog/BlogList";
import BlogPost from "./react-app/components/blog/BlogPost";
import PageNotFound from "./react-app/components/common/error-pages/PageNotFound";
import { ThemeProvider } from "./react-app/theme";
import { AchievementsProvider } from "./react-app/game/achievements";

// Kept for older imports; new code should import from ./analytics.
export { mixpanel } from "./analytics";

const App = () => (
  <Router>
    <AchievementsProvider>
      <ThemeProvider>
        <Switch>
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/blog" exact component={BlogList} />
          <Route path="/" exact component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </ThemeProvider>
    </AchievementsProvider>
  </Router>
);

export default App;
