import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from "react-device-detect";
import "./GameGallery.css";
import { mixpanel } from "../../../App";

const games = [
  {
    title: "Zen Garden",
    thumbnail:
      "https://img.itch.zone/aW1nLzE3Nzg1NTEzLnBuZw==/315x250%23c/ilHY7P.png",
    url: "https://dpsguzzler.itch.io/zen-garden",
    embedUrl: "https://itch.io/embed-upload/11514825?color=ffffff",
    description:
      "A 2D top-down survival game where you survive as a zen monk in a garden.",
    technologies: "Unity",
    releaseDate: "September 2024",
    embeddable: true,
  },
  {
    title: "Divided Destiny",
    thumbnail:
      "https://img.itch.zone/aW1nLzEyNzU0OTE0LnBuZw==/315x250%23c/O6Sg3r.png",
    url: "https://dpsguzzler.itch.io/divided-destiny",
    embedUrl: "https://itch.io/embed-upload/8289447?color=ffffff",
    description: "A 2D puzzle platformer exploring themes of personal identity.",
    technologies: "Unity",
    releaseDate: "July 2023",
    embeddable: true,
  },
  {
    title: "Love Farm",
    thumbnail:
      "https://img.itch.zone/aW1nLzEwNjY0MTI3LnBuZw==/315x250%23c/gpQ%2BOf.png",
    url: "https://mrmathur.itch.io/love-at-first-sight",
    embedUrl: "https://itch.io/embed-upload/6928454?color=FFFFFF",
    description:
      "A reverse stealth 2D top-down game where you help a love-struck bunny avoid falling for toxic relationships on the farm.",
    technologies: "Unity",
    releaseDate: "December 2022",
    embeddable: true,
  },
  {
    title: "InCUBE8",
    thumbnail:
      "https://img.itch.zone/aW1nLzk1MzI2ODkuanBn/315x250%23c/iE%2B53Q.jpg",
    url: "https://dpsguzzler.itch.io/incub",
    embedUrl: "https://itch.io/embed-upload/6173636?color=ffffff",
    description:
      "A 3D puzzle game challenging players to roll a die to activate platforms.",
    technologies: "Unity",
    releaseDate: "July 2022",
    embeddable: true,
  },
  {
    title: "The Afterlife Party",
    thumbnail:
      "https://img.itch.zone/aW1nLzgyNzMxNzMucG5n/315x250%23c/6Gx2FE.png",
    url: "https://dpsguzzler.itch.io/the-afterlife-party",
    embedUrl: "https://itch.io/embed-upload/5340536?color=FFFFFF",
    description:
      "A puzzle platformer where players cleanse an entire party of undead spirits.",
    technologies: "Unity",
    releaseDate: "February 2022",
    embeddable: true,
  },
];

const settings = {
  infinite: true,
  dots: true,
  speed: 500,
  arrows: true,
  autoplaySpeed: 3000,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1500,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 1300,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        swipeToSlide: true,
      },
    },
  ],
};

const gallerySignals = ["Mechanics", "Feedback", "Pacing", "Mood", "Experimentation"];

const GameGallery = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  const closeModal = useCallback(() => {
    if (activeGame) {
      mixpanel.track("Game Modal Close", {
        game_name: activeGame.title,
      });
    }
    setIsModalVisible(false);
    setActiveGame(null);
  }, [activeGame]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  const openModal = (game) => {
    mixpanel.track("Game Click", {
      game_name: game.title,
      device: isMobile ? "mobile" : "desktop",
    });

    if (isMobile || !game.embeddable) {
      window.open(game.url, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveGame(game);
    setIsModalVisible(true);
  };

  const handleGameKeyDown = (event, game) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(game);
    }
  };

  return (
    <section className="game-gallery" id="games">
      <div className="gallery-header">
        <span className="gallery-eyebrow">Builder mode 03</span>
        <h2 className="gallery-heading">Games as the play lab</h2>
        <p className="gallery-copy">
          This is where product instinct gets to breathe a little. The projects
          are playful, but they sharpen the same taste for interaction feel,
          readable systems, and surprising feedback that shows up in more
          serious work too.
        </p>
        <div className="gallery-signal-row" aria-label="Games section themes">
          {gallerySignals.map((signal) => (
            <span key={signal} className="gallery-signal">
              {signal}
            </span>
          ))}
        </div>
      </div>

      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.title} className="game-slide">
            <div
              className="game-card"
              onClick={() => openModal(game)}
              onKeyDown={(event) => handleGameKeyDown(event, game)}
              role="button"
              tabIndex={0}
              aria-label={`${isMobile ? "Open" : "Launch"} ${game.title}`}
            >
              <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
              <div className="game-info">
                <div className="game-meta">
                  <span className="game-pill">{game.technologies}</span>
                  <span className="game-pill game-pill-muted">{game.releaseDate}</span>
                </div>
                <h3>{game.title}</h3>
                <p className="game-description">{game.description}</p>
                <span className="play-button">
                  {isMobile ? "Open on itch.io" : "Launch demo"}
                </span>
                {isMobile ? (
                  <p className="mobile-hint">Best experienced on desktop when possible</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {isModalVisible ? (
        <div className="custom-modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-button" onClick={closeModal} aria-label="Close game">
              &times;
            </button>
            {activeGame ? (
              <iframe
                src={activeGame.embedUrl}
                title={activeGame.title}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default GameGallery;
