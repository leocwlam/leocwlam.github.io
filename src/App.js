import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';

import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

import styled from 'styled-components'

import Header from './components/Header'
import ProfilePage from './ProfilePage'
import ProjectPage from './ProjectPage'
import ContactPage from './ContactPage'
import PageNotFoundPage from './PageNotFoundPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import plenioLightImage from './assets/backgrounds/plenio-light.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${plenioLightImage}) no-repeat fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    // position: relative;
    // margin-right: 0;
    margin-bottom: 0;
    // border-bottom-style: hidden;
  }

  .jumboContentBase {
    background-size: cover;
    position: relative;
    margin-right: 0;
    margin-bottom: 0;
    min-height: 40rem;
    // top: 1rem;
  }

  @media (max-width: 1200px) {
    .jumboContentBase {
      width: 190%;
      height: 56rem;
    }
  }

  @media (max-width: 600px) {
    .jumboContentBase {
      width: 345%;
      height: 48rem;
    }
  }
`

function App() {
  return (
    <Styles>
      <ReactNotification />
      <BrowserRouter>
        <div>    
          <Header />
        </div>
        <div className="container-fluid jumbo md-0" style= {{ 'minHeight': '47rem'}}>
          <Routes>
            <Route path="/" exact element={<ProfilePage />} />
            <Route path="/open-source" element={<ProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route element={<PageNotFoundPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Styles>
  )
}

export default App
