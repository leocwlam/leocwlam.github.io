import React from 'react'

import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'

import profileBackgroundImage from './assets/backgrounds/profile.jpg'

import Profile from './components/Profile'
import News from './components/News'

const Styles = styled.div`

  .jumboContentBase {
    background: url(${profileBackgroundImage}) no-repeat fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .container {
    display:  flex;
    margin: 0px;
  }
`

function ProfilePage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container className="container">
          <div>
            <Profile />
          </div>
          <div>
            <News />
          </div>
        </Container>
      </Jumbo>
    </Styles>
  )
}

export default ProfilePage