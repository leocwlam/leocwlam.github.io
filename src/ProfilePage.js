import React from 'react'
import {isMobile} from 'react-device-detect';

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
    margin: 0px;
  }
`

function ProfilePage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase" style={(isMobile) ? {width: '200%'} : {}}>
        <Container className="container">
          <table>
            <tbody>
              <tr>
                <td className="align-top">
                  <Profile />
                </td>
                <td className="align-top">
                  <News />
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Jumbo>
    </Styles>
  )
}

export default ProfilePage