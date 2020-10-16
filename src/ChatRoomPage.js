import React from 'react'

import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'

import chatRoomGateImage from './assets/backgrounds/chat-room-gate.jpg'

import RoomMenu from './components/chat-room/RoomMenu'
import ChatDetail from './components/chat-room/ChatDetail'

const Styles = styled.div`
  .jumboContentBase {
    background: url(${chatRoomGateImage}) no-repeat fixed center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .generalLayout {
    display: flex;
  }
  
  .roomMenu {
    background-color: #515151;
    min-width: 8rem;
  }
`

function ChatRoomPage() {
  return (
    <Styles>
      <Jumbo fluid className="jumboContentBase">
        <Container className="generalLayout">
          <div className="roomMenu">
              <RoomMenu/>
          </div>
          <div>
              <ChatDetail/>
          </div>
        </Container>
      </Jumbo>
    </Styles>
  )
}

export default ChatRoomPage