import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import carousel CSS
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from "react-device-detect";
import "./GameGallery.css"; // Import custom CSS

const games = [
    {
      title: "Zen Garden",
      thumbnail:
        "https://img.itch.zone/aW1nLzE3Nzg1NTEzLnBuZw==/315x250%23c/ilHY7P.png",
      url: "https://dpsguzzler.itch.io/zen-garden", // Normal itch.io URL
      embedUrl: "https://itch.io/embed-upload/11514825?color=ffffff", // Embed URL for iframe
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
      description:
        "A 2D puzzle platformer exploring themes of personal identity.",
      technologies: "Unity",
      releaseDate: "July 2023",
      embeddable: true,
    },
    {
      title: "Love Farm",
      thumbnail: "https://img.itch.zone/aW1nLzEwNjY0MTI3LnBuZw==/315x250%23c/gpQ%2BOf.png",
      url: "https://mrmathur.itch.io/love-at-first-sight",
      embedUrl: "https://itch.io/embed-upload/6928454?color=FFFFFF",
      description: "The farm is in a Hollywood crisis! Our bunny has been binge-watching Ryan Gosling movies and now has unrealistic expectations of love! Can you help the bunny get home without falling in love?",
      technologies: "Unity",
      releaseDate: "December 2022",
      embeddable: true
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


  const GameGallery = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeGame, setActiveGame] = useState(null);
  
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, []);
  
    const settings = {
      infinite: true,
      dots: true,
      speed: 500,
      arrows: true,
      autoplaySpeed: 3000,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            swipeToSlide: true,
          },
        },
      ],
    };
  
    const openModal = (game) => {
      if (isMobile) {
        window.open(game.url, "_blank");
      } else {
        setActiveGame(game);
        setIsModalVisible(true);
      }
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
      setActiveGame(null);
    };
  
    return (
      <div className="game-gallery">
        <h2 className="gallery-heading">Games</h2>
        <Slider {...settings}>
          {games.map((game, index) => (
            <div key={index} className="game-slide">
              <div className="game-card" onClick={() => openModal(game)}>
                <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p className="game-date">{game.releaseDate}</p>
                  <p className="game-description">{game.description}</p>
                  <button className="play-button">
                    {isMobile ? "View Game" : "Play Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
  
        {isModalVisible && (
          <div className="custom-modal-overlay" onClick={closeModal}>
            <div
              className="custom-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeModal}>&times;</button>
              {activeGame && (
                <iframe
                  src={activeGame.embedUrl}
                  title={activeGame.title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default GameGallery;