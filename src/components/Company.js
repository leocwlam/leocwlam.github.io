import React from 'react';
import styled from 'styled-components';

import { Accordion, Button, Card /*, Badge, Button */ } from 'react-bootstrap';

const UPTAKEURL = 'https://www.uptake.com/';
const ELOQUAURL = 'https://www.oracle.com/marketingcloud/products/marketing-automation/';

const Styles = styled.div`
  .card {
    width: 53rem;
  }
`;

function Company() {
  return (
    <Styles>
      <Card border="light" className="card">
        <Card.Header>Career path</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Card className="card" style={{width: "42rem"}}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Uptake
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Card.Title>Uptake (Software Engineer)</Card.Title>
                  <Card.Subtitle>
                    <a href={UPTAKEURL} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {UPTAKEURL}
                    </a>
                  </Card.Subtitle>
                  <Card.Text>
                      <br />
                      Uptake is an industrial artificial intelligence (AI)
                      software company.
                      <br />
                      Built around a foundation of data science and machine
                      learning.
                      <br />
                      <br />
                      Uptake’s core products include an Asset Performance
                      Management application and a fully managed platform.
                      <br />
                      <br />
                      Detect machine issues early and prevent unplanned
                      downtime.
                  </Card.Text>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="card" style={{width: "42rem"}}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Oracle
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Card.Title>Oracle Eloqua (Senior Software Developer)</Card.Title>
                  <Card.Subtitle>
                    <a href={ELOQUAURL} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {ELOQUAURL}
                    </a>
                  </Card.Subtitle>
                    <br />
                    Eloqua is a software as a service (SaaS) platform for
                    marketing automation offered by Oracle
                    that aims to help B2B marketers and organizations manage
                    marketing campaigns and sales lead generation.
                    <br />
                    <br />
                    Eloqua sends marketing advertisements to mobile devices,
                    email, video and search results pages.
                    <br />
                    <br />
                    The platform promises increased conversions, sales and
                    understanding of customers.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Card.Body>
      </Card>
    </Styles>
  );
}

export default Company;