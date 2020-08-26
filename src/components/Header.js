import React from "react";
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

import styled from 'styled-components';

const Styles = styled.div`
  .jumbo {
    color: #f7f14f;
    height: 130px;
    width: 100%;
    position: relative;
    z-index: 100;
  }

  .overlay {
    background-color: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: -15px;
    right: -15px;
    bottom: 0;
    z-index: -1;
  }
`;

function Header(){
  const activeStyle =  { color: "orange" };
  return (
    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <nav>
            <NavLink activeStyle={activeStyle} exact to="/">Home</NavLink>
            {" | "}
            <NavLink activeStyle={activeStyle} to="/open-source">Passion</NavLink>
            {" | "}
            {/* <NavLink activeStyle={activeStyle} to="/chat-room">Chat Room</NavLink>
            {" | "} */}
            <NavLink activeStyle={activeStyle} to="/contact">Contact</NavLink>
          </nav>
        </Container>
      </Jumbo>
    </Styles>
  );
}

export default Header;