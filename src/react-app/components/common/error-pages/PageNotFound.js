import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteTopBar from "../SiteTopBar";
import "./PageNotFound.css";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page not found | Sharang Pai";
  }, []);

  return (
    <div className="game-over">
      <SiteTopBar variant="reading" />
      <main className="game-over-main">
        <p className="game-over-code">404</p>
        <h1 className="game-over-title">Game over</h1>
        <p className="game-over-copy">There's no level at this address. Check the link, or start again from the title screen.</p>
        <Link to="/" className="game-over-btn">
          <span aria-hidden="true">▶</span> Continue
        </Link>
      </main>
    </div>
  );
};

export default PageNotFound;
