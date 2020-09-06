import React from 'react'

import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'

import chatRoomGateImage from './assets/backgrounds/chat-room-gate.jpg'

const Styles = styled.div`
  .jumboContentBase {
    background: url(${chatRoomGateImage}) no-repeat fixed center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
`

function ChatRoomPage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container>
          <p>Under Construction</p>
        </Container>
      </Jumbo>
    </Styles>
  )
}

export default ChatRoomPage