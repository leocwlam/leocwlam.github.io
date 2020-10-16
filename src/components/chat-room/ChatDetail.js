import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { Avatar, Chip } from '@material-ui/core'

import useLocalStorage from '../../hooks/useLocalStorage'

const Styles = styled.div`
  .chatDisplay {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 27rem;
    width: 60rem;
    opacity: 1;
    overflow: auto;
    margin-top: 0.5rem;
    
    .message {
      display: flex;
      padding: 0.1rem;
    }

    .myPostedMessage {
      margin-left: auto;
      margin-right:0.8rem;
    }
  
    .messageTime {
      color: orange;
      font-size: xx-small;
      align-self: flex-end;
    }
  }

  .roomDetail {
    margin-left: 1rem;

    .header{
      display: flex;
      font-size: larger;
      color: orange;
      justify-content: space-between;
      align-items: center;

      .roomInformation {
        background: #515151;

        .roomTitle {
          margin-left: 5rem;
          justify-content: center;
          height: 1rem;
          width: 50rem;
        }
      }

      .leave {    
        margin-right: 1rem;
      }
    }
    
    .postMessageArea {
      display: flex;
      margin-top: 0.5rem;

      .postMessage {
        width: 55rem;
      }

      .postSend {
        margin-left: 0.5rem;
      }
    }
  }
`

function ChatDetail(props) {
  const messageStyle =  { background: "#ffc800" }
  const postMessageStyle =  { background: "red" }

  const [roomName, setRoomName] = useLocalStorage('inRoom', null)
  const [postMessage, setPostMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [messageShow, setMessageShow] = useState(true);

  // const handleMessageClick = () => setMessageShow(!show);

  function renderNewMessage(userInformation, message) {
    return (
      <div className={`${userInformation.isMyPost ? 'myPostedMessage' : ''} message`}>
        <Chip
          variant="outlined"
          size="small"
          avatar={<Avatar>{userInformation.name.substring(0,4)}</Avatar>}
          label={message}
          // onClick={handleMessageClick}
          style={messageStyle}
          />
          <div className="messageTime">
            {new Date().toLocaleTimeString('en-US')}
          </div>
      </div>
    )
  }

  const handlePostMessage = () => {
    const newMessages = [...messageList]
    newMessages.push(
      renderNewMessage({isMyPost: true, name: 'Leorrrrrrrrttt'}, 'This is the testing message.'))
    setMessageList(newMessages)
  }

  const handleLeave = () => {
  }

  useEffect(() => {
    // console.log('xxxxxxxx')
  })

  return (
    <Styles>
      <div className="roomDetail">
        <div className="header">
          <div className = "roomInformation">
            <h5 className="roomTitle">
              <label>
                {roomName}
              </label>
            </h5>
          </div>
          <div className="leave">
            <Button size="sm"  onClick={ handleLeave }>Leave</Button>
          </div>
        </div>
        <div className="chatDisplay">
        {(() => {
          return messageList.map((message, index) => {
            return message
          });
        })()}
        </div>
        <div className="postMessageArea">
          <div>
            <input name='postMessage' value={postMessage} className='postMessage'/>
          </div>
          <div className="postSend">
            <Button size="sm" onClick={ handlePostMessage }>Send</Button>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default ChatDetail