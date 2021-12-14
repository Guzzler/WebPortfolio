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
                <span>April 2021 - Current</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Senior Software Engineer / Head of UI/UX Engineering, RedBrickAI
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
                <h3 className="timeline-title">
                  Co Founder and Developer, Openshiksha Initiative{" "}
                </h3>
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
                <span>May 2018</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Creator , Chess Kabaddi </h3>
                <p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.chesskabaddi.game"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    ChessKabaddi
                  </a>{" "}
                  is a novel multiplayer cross-platform game built with a state
                  of the art adversarial AI which is a fusion of the
                  intellectual stimulation of Chess with the fun of the Indian
                  sport Kabaddi. I build this from scratch using Java and LibGdx
                  to and made basic gameAI using Minimax Algorithms and basic
                  neural networks.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Java, Libgdx.
                </p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>May 2021</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Co-Founder , VaccinePost</h3>
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
                <span>Jan 2016 - May 2018</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Developer/Event Lead , Cyberhawk
                </h3>
                <p>
                  <a
                    href="https://cyberhawk.iecsemanipal.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    Cyberhawk
                  </a>{" "}
                  is a web based online cryptic hunt played by over 1000 players.
                  My work included back-end(Flask/Go) development as well as
                  front-end (Angular/React.js) scripting.
                </p>
                <p>
                  <strong>Technologies Used: </strong>Flask, Angular, React.js, Javascript, Golang
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
