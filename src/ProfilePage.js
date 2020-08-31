import React from 'react'

import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'

import profileLeoImage from './assets/backgrounds/profile-leo.jpg'

import Profile from './components/Profile'
import News from './components/News'

const Styles = styled.div`
  .jumboContentBase {
    background: url(${profileLeoImage}) no-repeat;
  }
`

function ProfilePage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container>
          <table>
            <tbody>
              <tr>
                <td className="align-top align-right">
                  <Profile />
                </td>
                <td className="align-top align-right">
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