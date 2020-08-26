import React from "react";

import { Jumbotron as Jumbo, Container, Media } from "react-bootstrap";
import Scrollspy from 'react-scrollspy'
import styled from 'styled-components';

import openSourceHouseImage from "./assets/backgrounds/open-source-house.jpg";
import javascriptIcon from "./assets/icons/javascript.png";
import typescriptIcon from "./assets/icons/typescript.png";

const Styles = styled.div`
  .jumboContentBase {
    background: url(${openSourceHouseImage}) no-repeat fixed center;
  }
  .projects {
    background-color: white;
    opacity: 0.8;
    font-family: sans-serif;
    max-Height: 650px;
    overflow-y: auto;
  }
  .scrollspy {
    background-color: #515151;
    margin: 0px;
    width: 250px;
    top: 100px;
    right: 80px;
    position: absolute;
  }
  ul {
    list-style: none;
    margin: 0px;
  }
  li {
    margin: 5px;
    padding: 2px;
  }
  .isCurrent {
    font-weight: bold;
  }
  .isCurrent a, h2 {
       color: #007bff;
  //   color: #f1a07a;
  }
`;

function ProjectPage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container className="projects">
        <div>
            <div>
              <section id="javaScript-area">
                <div>
                  <section id="system-logger">
                    <Media>
                      <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={javascriptIcon}
                        alt="system-logger"
                      />
                      <Media.Body>
                        <h4>system-logger</h4>
                        <h5>
                          <a
                            href="https://github.com/leocwlam/system-logger"
                            target="_blank"
                          >
                            https://github.com/leocwlam/system-logger
                          </a>
                        </h5>
                        <p>
                          Provide the basic logging mechanism. It can be easy to
                          inject the storage logic for those logging result.
                        </p>
                      </Media.Body>
                    </Media>
                  </section>
                  <section id="system-task">
                    <Media>
                      <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={javascriptIcon}
                        alt="system-task"
                      />
                      <Media.Body>
                        <h4>system-task</h4>
                        <h5>
                          <a
                            href="https://github.com/leocwlam/system-task"
                            target="_blank"
                          >
                            https://github.com/leocwlam/system-task
                          </a>
                        </h5>
                        <p>
                          Provide the basic task framework to help initial task
                          implementation. It can be easy to inject any logging
                          mechanism and integrate with any service framework.
                        </p>
                      </Media.Body>
                    </Media>
                  </section>
                  <section id="system-service">
                    <Media>
                      <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={javascriptIcon}
                        alt="system-service"
                      />
                      <Media.Body>
                        <h4>system-service</h4>
                        <h5>
                          <a
                            href="https://github.com/leocwlam/system-service"
                            target="_blank"
                          >
                            https://github.com/leocwlam/system-service
                          </a>
                        </h5>
                        <p>
                          Provide the basic service framework to help initial
                          service implementation. It can be easy to inject any
                          message framework and has built-in logging mechanism.
                        </p>
                      </Media.Body>
                    </Media>
                  </section>
                </div>
              </section>
              <section id="typeScript-area">
                <div>
                  <section id="TS-startup-template">
                    <Media>
                      <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={typescriptIcon}
                        alt="TS-startup-template"
                      />
                      <Media.Body>
                        <h4>TS-startup-template</h4>
                        <h5>
                          <a
                            href="https://github.com/leocwlam/TS-startup-template"
                            target="_blank"
                          >
                            https://github.com/leocwlam/TS-startup-template
                          </a>
                        </h5>
                        <p>
                          Provide the basic TypeScript startup framework to help
                          initial any project implementation. It can be easy to
                          inject any logging mechanism and integrate it with any
                          service framework.
                        </p>
                      </Media.Body>
                    </Media>
                  </section>
                </div>
              </section>
            </div>
            <Scrollspy
              className="scrollspy"
              items={[
                "javaScript-area",
                "typeScript-area",
                "system-logger",
                "system-task",
                "system-service",
                "TS-startup-template",
              ]}
              currentClassName="isCurrent"
            >
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" style={{margin: -15}} href="#javaScript-area">
                    JavaScript
                  </a>
                </li>
                <div>
                  <li className="nav-item">
                    <a href="#system-logger" className="nav-link">
                      system-logger
                    </a>
                    <a href="#system-task" className="nav-link">
                      system-task
                    </a>
                    <a href="#system-service" className="nav-link">
                      system-service
                    </a>
                  </li>
                </div>
                <li className="nav-item">
                  <a className="nav-link" style={{margin: -15}} href="#typeScript-area">
                    TypeScript
                  </a>
                </li>
                <div>
                  <li className="nav-item">
                    <a href="#TS-startup-template" className="nav-link">
                      TS-startup-template
                    </a>
                  </li>
                </div>
              </ul>
            </Scrollspy>
          </div>
        </Container>
      </Jumbo>
    </Styles>
  );
}

export default ProjectPage;