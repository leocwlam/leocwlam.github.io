import React from 'react'
import {isMobile} from 'react-device-detect';

import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'

import profileLeoImage from './assets/backgrounds/profile-leo.jpg'

import Profile from './components/Profile'

const Styles = styled.div`
  .jumboContentBase {
    background: url(${profileLeoImage}) no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
`

function ContactPage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase" style={(isMobile) ? {width: '200%'} : {}}>
        <Container>
          <Profile isContact={true} />
        </Container>
      </Jumbo>
    </Styles>
  )
}

export default ContactPage