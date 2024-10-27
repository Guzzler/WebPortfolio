import React from "react";
import "./timeline.css";

const ExperienceTimeline = (props) => {
  return (
    <div className="container-fluid">
      <div>
        <div>
          <ul className="timeline timeline-centered">
            <li className="timeline-item period">
              <div className="timeline-info"></div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h2 className="timeline-title">Work</h2>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>June 2024 - Current</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Founding Engineer, Stealth Startup (BetternowAI)
                </h3>
                <p>
                  Developing innovative systems as part of the product team to
                  provide individuals with a personalized, 24/7 coach for
                  managing stress and anxiety. This coach seamlessly integrates
                  cutting-edge technologies with proven therapeutic practices
                  and psychological insights to support a user's mental health.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Python, React.js, SwiftUI,
                  Typescript, FastAPI, CosmosDB.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>April 2022 - Aug 2022</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Software Engineer Consultant, StepChange
                </h3>
                <p>
                  Worked on architecting various systems as part of the product
                  team to empower individuals to make environmentally conscious
                  decisions to reduce their overall carbon footprint on this
                  planet.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Python, React.js, Jest,
                  Java, Android, AWS Tech Stack (S3, Lambdas etc), Typescript.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>April 2021 - March 2022</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Senior Software Engineer / Head of UI/UX Engineering,
                  RedBrickAI
                </h3>
                <p>
                  Leading a small team of engineers to build a training data
                  platform to help accelerate and manage computer vision
                  labeling while enforcing high quality standards at reasonable
                  cost. My responsibility here includes heading the entire
                  Frontend development of the product as well as helping with
                  system design and future technological management.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Python, React.js, Jest,
                  AWS Tech Stack (S3, Lambdas etc), GraphQL, Typescript.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>January 2019 - March 2021</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Software Development Engineer, Instamojo Technologies
                </h3>
                <p>
                  Full stack engineer working with a financial technology
                  company to build a new age payment and commerce product for
                  MSMEs (Micro, Small and Medium Enterprises). Worked on
                  projects that included sachet loans, micro-finance and UPI
                  (Unified Payment Interface) usage.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Python, Javascript,
                  React.js, Jest, Django, GoLang.
                </p>
              </div>
            </li>
            <li className="timeline-item period">
              <div className="timeline-info"></div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h2 className="timeline-title">Internships</h2>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>May 2023 - Aug 2023</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Senior Machine Learning Engineering Intern, UpDuo
                </h3>
                <p>
                  Worked on building AI inferencing and fine-tuning pipelines as
                  well as architecting a new system for the frontend development
                  of the organization's core Ed-tech product.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Flutter, Rust, Python,
                  Large Language models.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>May 2018 - July 2018</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Summer Intern, Microsoft Corporation
                </h3>
                <p>
                  Worked on a machine learning application based on Object
                  Detection, Object Tracking and Action Classification using
                  Microsoft’s Custom Vision library in combination with open
                  source libraries such as OpenCV, YOLOv3, a Deepmind
                  KineticsI3D based model and a custom trained action classifier
                  based in Keras to gain video-based insights on safety
                  scenarios in workplace environments.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Python, C, C++.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>May 2017 - July 2017</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Software Development Intern, Conscia Corporation
                </h3>
                <p>
                  Worked on the front-end development of Conscia's Data
                  Management and Enrichment platform using the React.js
                  framework with Redux for state-management and Jest for unit
                  testing. My work also involved using external libraries such
                  as the JSON-schema-form to build dynamic front-end components.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Javascript, React.js,
                  Jest.
                </p>
              </div>
            </li>
            <li className="timeline-item period">
              <div className="timeline-info"></div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h2 className="timeline-title">Projects</h2>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>April 2015</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Openshiksha Initiative </h3>
                <p>
                  <a
                    href="https://www.openshiksha.org"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    OpenShiksha
                  </a>{" "}
                  is a non-profit online adaptive learning platform, designed to
                  improve learning outcomes for students in underserved
                  communities in India. I managed a large portion of the
                  front-end development and project vision development. We
                  worked with multiple schools and ran a successful pilot at my
                  Alma mater DPS, Pune.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Javascript, React.js,
                  Jest, Django.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>May 2021</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">VaccinePost</h3>
                <p>
                  <a
                    href="https://vaccinepost.co.in"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    VaccinePost
                  </a>{" "}
                  is a vaccine notification system that was built during the
                  pandemic to help with location based notifications to allow
                  users in India to book their vaccine on priority at clinics
                  around them.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Javascript, React,js, AWS
                  Lambdas.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>Feb 2022</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">The Afterlife Party</h3>
                <p>
                  <a
                    href="https://dpsguzzler.itch.io/the-afterlife-party"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    The Afterlife Party
                  </a>{" "}
                  is a puzzle platformer with the objective to cleanse an entire
                  party of their undead spirits. Worked as a co-creator and lead
                  programmer, responsible for ideation and implementation of the
                  game within a one week period.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Unity
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>July 2022</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">InCUBE8</h3>
                <p>
                  <a
                    href="https://dpsguzzler.itch.io/incub"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    InCUBE8
                  </a>{" "}
                  is a 3d puzzle game with the objective to roll a die in
                  multiple directions using the arrow keys to activate the
                  platforms by landing the die's face on the corresponding
                  numbers. Worked as a co-creator and lead programmer,
                  responsible for ideation and implementation of the game within
                  a two day period.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Unity
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>July 2023</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Divided Destiny</h3>
                <p>
                  <a
                    href="https://dpsguzzler.itch.io/divided-destiny"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    Divided Destiny
                  </a>{" "}
                  is a 2D puzzle platformer where players guide two distinct
                  characters—a man with magnetic abilities and a woman with
                  agility and strength—on intersecting journeys of
                  self-discovery. Through innovative gameplay mechanics, players
                  solve intricate puzzles and explore themes of personal
                  identity, challenging societal norms, and embracing non-binary
                  perspectives in an immersive, thought-provoking experience.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Unity
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>Sept 2024</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Zen Garden</h3>
                <p>
                  <a
                    href="https://dpsguzzler.itch.io/zen-garden"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    Zen Garden
                  </a>{" "}
                  is a 2D Top Down Survival game with the objective of surviving
                  as a zen monk in a garden. Worked as a co-creator, responsible
                  for ideation and implementation of the game within a one week
                  period.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Unity
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
