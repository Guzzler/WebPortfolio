import React from "react";
import "./timeline.css";

const TechTags = ({ technologies }) => {
  const techArray = technologies.split(", ").map(tech => tech.trim().replace(".", ""));
  return (
    <div className="tech-tags-container">
      {techArray.map((tech, index) => (
        <span key={index} className="tech-tag">{tech}</span>
      ))}
    </div>
  );
};

const ExperienceTimeline = () => {
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
                  Founding Engineer, Persona AI
                </h3>
                <p>
                  Engineering the core intelligence and adaptive behavioral
                  systems for a platform to build 3D AI avatars with rich,
                  customizable behaviors and interactive visual experiences.
                </p>
                <TechTags technologies="Python, React.js, SwiftUI, Typescript, FastAPI, CosmosDB" />
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
                <TechTags technologies="Python, React.js, Jest, Java, Android, AWS, Typescript" />
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>April 2021 - March 2022</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Founding Engineer / Head of UI/UX Engineering,
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
                <TechTags technologies="Python, React.js, Jest, AWS, GraphQL, Typescript" />
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
                <TechTags technologies="Python, Javascript, React.js, Jest, Django, GoLang" />
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
                <TechTags technologies="Flutter, Rust, Python, LLMs" />
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
                  Microsoft's Custom Vision library in combination with open
                  source libraries such as OpenCV, YOLOv3, a Deepmind
                  KineticsI3D based model and a custom trained action classifier
                  based in Keras to gain video-based insights on safety
                  scenarios in workplace environments.
                </p>
                <TechTags technologies="Python, C, C++" />
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
                <TechTags technologies="Javascript, React.js, Jest" />
              </div>
            </li>
            <li className="timeline-item period">
              <div className="timeline-info"></div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h2 className="timeline-title">OpenSource Projects</h2>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-info">
                <span>April 2015</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Openshiksha Initiative</h3>
                <p>
                  <a
                    href="https://github.com/openshiksha/openshiksha"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    OpenShiksha
                  </a>{" "}
                  is a non-profit online adaptive learning platform, designed to
                  improve learning outcomes for students in underserved
                  communities in India. I managed a large portion of the
                  front-end development and project vision development. We
                  worked with multiple schools and ran a successful pilot at my
                  Alma mater DPS, Pune.
                </p>
                <TechTags technologies="Javascript, React.js, Jest, Django" />
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
                    href="https://github.com/Guzzler/Cowin-Notification-System"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    VaccinePost
                  </a>{" "}
                  is a vaccine notification system that was built during the
                  pandemic to help with location based notifications to allow
                  users in India to book their vaccine on priority at clinics
                  around them.
                </p>
                <TechTags technologies="Javascript, React.js, AWS Lambdas" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
