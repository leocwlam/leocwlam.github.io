import React from "react";

import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

import notFoundImage from "./assets/backgrounds/not-found.jpg";

const Styles = styled.div`
  .jumboContentBase {
    background: url(${notFoundImage}) no-repeat fixed center;
    color: #f7f14f;
    min-height: 740px; 
    z-index: 100;
  }
`;

function PageNotFoundPage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container>
          <h2>Page Not Found</h2>
          <p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </p>
        </Container>
      </Jumbo>
    </Styles>
  );
}

export default PageNotFoundPage;
