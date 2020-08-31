import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.scss';

import styled from 'styled-components'

import Header from './components/Header'
import ProfilePage from './ProfilePage'
import ProjectPage from './ProjectPage'
import ChatRoomPage from './ChatRoomPage'
import ContactPage from './ContactPage'
import PageNotFoundPage from './PageNotFoundPage'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import plenioLightImage from './assets/backgrounds/plenio-light.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${plenioLightImage}) no-repeat fixed;
    background-size: cover;
    position: relative;
  }

  .jumboContentBase {
    background-size: cover;
    position: relative;
    max-height: 760px;
    min-height: 760px;
  }
`

function App() {
  return (
    <Styles>
      <BrowserRouter>
        <div className="container-fluid jumbo">
          <Header />
          <Switch>
            <Route path="/" exact component={ProfilePage} />
            <Route path="/open-source" component={ProjectPage} />
            <Route path="/chat-room" component={ChatRoomPage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={PageNotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Styles>
  );
}

export default App
