import React from 'react'

import { Jumbotron as Jumbo, Container, Media } from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import styled from 'styled-components'

import openSourceHouseImage from './assets/backgrounds/open-source-house.jpg'
import javascriptIcon from './assets/icons/javascript.png'
import typescriptIcon from './assets/icons/typescript.png'

const ProjectType = {
  JavaScript: 0,
  TypeScript: 1
}

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
`

function ProjectPage() {

  const projectIcon = (type) => {
    if (type === ProjectType.JavaScript)
      return javascriptIcon
    else if (type === ProjectType.TypeScript)
      return typescriptIcon
    else
      return ''
  }

  const projectSection = ({type, project, url, description}) =>  {
    return (
      <section id={project}>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={projectIcon(type)}
            alt={project}
          />
          <Media.Body>
            <h4>{project}</h4>
            <h5>
              <a
                href={url}
                target="_blank"  rel="noopener noreferrer"
              >
                {url}
              </a>
            </h5>
            <p>
              {description}
            </p>
          </Media.Body>
        </Media>
      </section>
    )
  }
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container className="projects">
        <div>
            <div>
              <section id="javaScript-area">
                <div>
                  { projectSection({
                    type: ProjectType.JavaScript,
                    project: 'system-logger',
                    url: 'https://github.com/leocwlam/system-logger',
                    description: 'Provide the basic logging mechanism. It can be easy to inject the storage logic for those logging result.'
                  }) }
                  
                  { projectSection({
                    type: ProjectType.JavaScript,
                    project: 'system-task',
                    url: 'https://github.com/leocwlam/system-task',
                    description: 'Provide the basic task framework to help initial task implementation. It can be easy to inject any logging mechanism and integrate with any service framework.'
                  }) }

                  { projectSection({
                    type: ProjectType.JavaScript,
                    project: 'system-service',
                    url: 'https://github.com/leocwlam/system-service',
                    description: 'Provide the basic service framework to help initial service implementation. It can be easy to inject any message framework and has built-in logging mechanism.'
                  }) }
                </div>
              </section>
              <section id="typeScript-area">
                <div>
                  { projectSection({
                    type: ProjectType.TypeScript,
                    project: 'TS-startup-template',
                    url: 'https://github.com/leocwlam/TS-startup-template',
                    description: 'Provide the basic TypeScript startup framework to help initial any project implementation. It can be easy to inject any logging mechanism and integrate it with any service framework.'
                  }) }
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
  )
}

export default ProjectPage