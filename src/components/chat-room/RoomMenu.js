import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Image, Button, Modal } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { showAlertMessage } from '../../lib/notificationsHelper'
import LeaveRoom from './LeaveRoom'

import useLocalStorage from '../../hooks/useLocalStorage'
import useScript, { STAUTS as ScriptStatus} from '../../hooks/useScript'
import roomGroup from '../../assets/icons/roomGroup.png'

const CHATROOMURL = process.env.CHATROOMURL || "http://localhost:5000"

const STATICROOMS = ['Public', 'Family']
const MAXNUMBEROFROOMS = 10

const Styles = styled.div`
  .generalLayout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 29rem;
  }
  
  .header {
    display: flex;
    justify-content: center;
    color: orange;
  }

  .room {
    display: flex;

    .roomSize {
      color: white;
      font-size: xx-small;
      margin-right: 0.5rem;
    }
  }

  .roomUsers {
    height: 9.3rem;
    overflow: auto;
    color: white;
  }

  .roomOperation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .createdRoomLayout {
    width: 6rem;
  }

  .staticRooms {
    text-align: center;
    color: red;
  }

  .editOperation {
    margin-left: 0.5rem;
  }

  .divider {
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
    .hrDivider {
      border: 0.1rem solid black;
      border-radius: 5px;
      margin: auto;
    }
  }
`

function RoomMenu() {
  const socketIoScriptStatus = useScript({sourceUrl: `${CHATROOMURL}/socket.io/socket.io.js`, async: false, defer: true})
  const chatServiceClientScriptStatus = useScript({sourceUrl: `${CHATROOMURL}/client-script.js`, async: false, defer: true})
  const activeStaticStyle =  { color: "#ffca54" }
  const activeStyle =  { color: "#c39223" }
  const roomImageWidthSize = "15rem"

  const PopupLeaveRoomContext = React.createContext()
  
  const [setupRoomCallbackNotificationDone, setSetupupRoomCallbackNotificationDone] = useState(false)
  const [setupJoinMemberToRoomNotificationDone, setSetupJoinMemberToRoomNotificationDone] = useState(false)
  const [setupLeaveMemberToRoomNotificationDone, setSetupLeaveMemberToRoomNotificationDone] = useState(false)
  const [popupConfirmLeaveRoomShow, setPopupConfirmLeaveRoomShow] = useState(false)
  const [popupJoinRoomShow, setPopupJoinRoomShow] = useState(false)

  const [popupRoomCreationShow, setPopupRoomCreationShow] = useState(false)
  const [numberOfPublicChaters, setNumberOfPublicChaters ] = useState(-1)
  const [numberOfFamilyChaters, setNumberOfFamilyChaters ] = useState(-1)
  const [rooms, setRooms] = useState([])
  const [createRoom, setCreateRoom] = useState('')
  const [createHostName, setCreateHostName] = useState('')
  const [joinNewRoom, setJoinNewRoom] = useState(null)
  const [inRoom, setInRoom] = useLocalStorage('inRoom', null)
  const [chaterName, setChaterName] = useLocalStorage('chaterName', null)
  // const [users, setUsers] = useState(['Leo', 'pp', 'Leo', 'pp', 'pp', 'Leo', 'pp', 'pp', 'Leo', 'pp', 'pp', 'Leo', 'pp', 'pp', 'Leo', 'pp'])
  const [users, setUsers] = useState([])

  function showProcessMessage(message, width) {
    showAlertMessage({type:'info', title: 'Processing request', message, width, duration: 2500})
  }
  
  function showErrorMessage(message, width) {
    showAlertMessage({type:'danger', title: 'Error', message, width, duration: 2500})
  }

  function showInvalidRoomCreateMessage(message, width) {
    showAlertMessage({type:'warning', title: 'Warning', message, width, duration: 2500})
  }

  const isValidateRoomCreation = (roomName, roomHostName) => {
    let isValid = true
    if (rooms.length >= MAXNUMBEROFROOMS) {
      showInvalidRoomCreateMessage('Number of rooms reached the maximum limited', 250)
      isValid = false
    }
    if (!roomName) {
      showInvalidRoomCreateMessage('Missing room name', 250)
      isValid = false
    }
    if (rooms.includes(roomName)) {
      showInvalidRoomCreateMessage('Room name is already existed', 250)
      isValid = false
    }
    if (!roomHostName) {
      showInvalidRoomCreateMessage('Missing host name', 250)
      isValid = false
    }
    return isValid
  }

  const popupRoomCreation = () => {
    const handlerPopupRoomCreationClose = () => setPopupRoomCreationShow(false)
    const handlerRoomCreation = () => {
      const roomName = createRoom
      const roomHostName = createHostName
      if (isValidateRoomCreation(roomName, roomHostName)) {
        setCreateRoom('')
        setCreateHostName('')
        requestNewRoom(roomName, roomHostName)
        setPopupRoomCreationShow(false)
      }
    }

    const handlerCreateRoomChange = (event) => {
      setCreateRoom(event.target.value)
    }

    const handlerCreateHostNameChange = (event) => {
      setCreateHostName(event.target.value)
    }

    return (
      <Modal show={popupRoomCreationShow} onHide={handlerPopupRoomCreationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label style={{minWidth: "9rem"}}>
              Room Name
            </label>
            <input name='newRoomName' type='text' value={createRoom} onChange={handlerCreateRoomChange}/>
          </div>
          <div>
            <label style={{minWidth: "9rem"}}>
              Host Name
            </label>
            <input name='newHostName' type='text' value={createHostName} onChange={handlerCreateHostNameChange}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handlerRoomCreation}>
            Create
          </Button>
          <Button variant="secondary" size="sm" onClick={handlerPopupRoomCreationClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  
  const popupJoinRoom = () => {
    const handlerPopupJoinRoomClose = () => {
      setInRoom(null)
      setPopupJoinRoomShow(false)
    }

    const handlerJoinRoom = () => {
      window.requestJoinRoom(joinNewRoom, chaterName)
      setInRoom(joinNewRoom)
      setPopupJoinRoomShow(false)
    }

    const handlerChaterNameChange = (event) => {
      setChaterName(event.target.value)
    }

    return (
      <Modal show={popupJoinRoomShow} onHide={handlerPopupJoinRoomClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join {joinNewRoom} Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label style={{minWidth: "9rem"}}>
              Enter your name
            </label>
            <input name='ChaterName' type='text' value={chaterName} onChange={handlerChaterNameChange}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handlerJoinRoom}>
            Join Room
          </Button>
          <Button variant="secondary" size="sm" onClick={handlerPopupJoinRoomClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handlerAfterLeaveRoomProcess = () => {
    window.requestLeaveRoom(inRoom)
    setInRoom(null)
    setUsers([])
    setPopupJoinRoomShow(true)
    popupJoinRoom()
  }

  const renderMenuRoom = (numberOfChaters, roomName, navStyle) => {
    const handleJoinRoom = (event) => {
      const newRequestInRoom = event.target['textContent']
      if (inRoom !== newRequestInRoom) {
        setJoinNewRoom(newRequestInRoom)
        if (inRoom) {
          handlerConfirmLeaveRoom()
        }
        else {
          setPopupJoinRoomShow(true)
        }
      }
    }

    if (numberOfChaters >= 0) {
      return <div className="room" key={`room-${roomName}`}>
        <div>
          <Image src={roomGroup} className="cardImage" width={roomImageWidthSize} />
        </div>
        <div className="roomSize">
          { numberOfChaters }
        </div>
        <NavLink activeStyle={navStyle} key={`roomLink-${roomName}`} exact to={`/chat-room#${roomName}`}
          onClick={handleJoinRoom}
          value={roomName}
        >{roomName}</NavLink>
      </div>
    }
    
    return <div className="room"></div>
  }

  const renderPublicRoomSession = () => {
    return renderMenuRoom(numberOfPublicChaters, STATICROOMS[0], activeStaticStyle)
  }

  const renderFamilyRoomSession = () => {
    return renderMenuRoom(numberOfFamilyChaters, STATICROOMS[1], activeStaticStyle)
  }

  const renderCustomRoomsSession = () => {
    if (rooms.length > 0) {
      return rooms.map((room, index) => {
        return renderMenuRoom(room.numberOfChaters, room.name, activeStyle)
      })
    }
    return <div></div>
  }

  const renderUsersSession = () => {
    if (users.length > 0) {
      return users.map((user, index) => {
        return <div key={`user-${index}`}>{user}</div>
      })
    }
    return <div></div>
  }

  const requestNewRoom = (roomName, hostName, hideAlert = false) => {
    fetch(`${CHATROOMURL}/room/${roomName}/${hostName}`, {
      method: 'post',
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
      if (!STATICROOMS.includes(data.room)) {
        showProcessMessage(`'${data.room}' was requested to create`, 250)
      }     
    })
    .catch((err) => {
      if (!hideAlert) {
        console.log(err)
        showErrorMessage('Fail to create new room', 250)
      }
    })
  }

  const createStaticRooms = () => {
    STATICROOMS.forEach(room => {
      requestNewRoom(room, '-', true)
    })
  }
  
  const refreshRooms = () => {
    fetch(`${CHATROOMURL}/rooms`, {
      method: 'get',
    })
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        const updateRooms = []
        for(const room of data) {
          if (!STATICROOMS.includes(room.room)) {
            updateRooms.push({name: room.room, numberOfChaters: room.users.length})
          } else {
            if (room.room === STATICROOMS[0]) {
              setNumberOfPublicChaters(room.users.length)
            }
            if (room.room === STATICROOMS[1]) {           
              setNumberOfFamilyChaters(room.users.length) 
            }
          }
        }
        setRooms(updateRooms)
      }
    })
    .catch((err) => {
      console.log(err)
      showErrorMessage('Fail to refresh all rooms', 250)
    })
  }

  const handlerConfirmLeaveRoom = () => {
    setPopupConfirmLeaveRoomShow(true)
  }

  const handlerCreateRoom = () => {
    setPopupRoomCreationShow(true)
  }
  
  const handlerEditRoom = () => {
  }

  useEffect(() => {
    createStaticRooms()
    refreshRooms()
  }, [])

  useEffect(() => {
    if (!setupRoomCallbackNotificationDone && (socketIoScriptStatus === ScriptStatus.ready) && (chatServiceClientScriptStatus === ScriptStatus.ready)) {
      window.setupRoomCreatedHandler ((roomName, hostName) => {
        refreshRooms()
        showAlertMessage({type:'success', title: 'Room Created', message: `'${roomName}' is created and hosted by '${hostName}'`, width: 250, duration: 5000})
      })
      setSetupupRoomCallbackNotificationDone(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupRoomCallbackNotificationDone, socketIoScriptStatus, chatServiceClientScriptStatus])

  useEffect(() => {
    if (!setupJoinMemberToRoomNotificationDone && (socketIoScriptStatus === ScriptStatus.ready) && (chatServiceClientScriptStatus === ScriptStatus.ready)) {
      window.setupChaterJoinRoomHandler ((roomName, userName) => {
        refreshRooms()
        showAlertMessage({type:'success', title: 'Join Room', message: `'${userName}' joined '${roomName}'`, width: 250, duration: 1000})
      })
      setSetupJoinMemberToRoomNotificationDone(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupJoinMemberToRoomNotificationDone, socketIoScriptStatus, chatServiceClientScriptStatus])

  useEffect(() => {
    if (!setupLeaveMemberToRoomNotificationDone && (socketIoScriptStatus === ScriptStatus.ready) &&  (chatServiceClientScriptStatus === ScriptStatus.ready)) {
      window.setupChaterLeaveRoomHandler ((roomName, userName) => {
        refreshRooms()
        showAlertMessage({type:'success', title: 'Leave Room', message: `'${userName}' left '${roomName}'`, width: 250, duration: 1000})
      })
      setSetupLeaveMemberToRoomNotificationDone(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupLeaveMemberToRoomNotificationDone, socketIoScriptStatus, chatServiceClientScriptStatus])

  return (
    <Styles>
      <h4 className="header">Rooms</h4>
      { popupRoomCreation() }
      { popupJoinRoom() }
      <PopupLeaveRoomContext.Provider value={{inRoom, popupConfirmLeaveRoomShow, setPopupConfirmLeaveRoomShow}}>
        <LeaveRoom show={popupConfirmLeaveRoomShow} inRoom={inRoom} popupLeaveRoomContext={PopupLeaveRoomContext} onAfterLeaveRoomProcess={handlerAfterLeaveRoomProcess}/>
      </PopupLeaveRoomContext.Provider>
      <div className="generalLayout">
        <div>
          <div className="staticRooms">
            <nav>
              { renderPublicRoomSession() }
              { renderFamilyRoomSession() }
            </nav>
          </div>
          <div className="createdRoomLayout">
            <nav>
              { renderCustomRoomsSession() }
            </nav>
          </div>
        </div>
        <div>
          <div>
              {(() => {
                if (users.length > 0) {
                  return (
                    <div className="divider">
                      <hr className="hrDivider"></hr>
                      <h5 className="header">Chaters</h5>
                    </div>
                  )
                }
              })()}
              <div className="roomUsers">
                { renderUsersSession() }
              </div>
          </div>
          <div className="divider">
            <hr className="hrDivider"></hr>
          </div>
          <div className="roomOperation">
            <div>
              <Button size="sm" onClick={ handlerCreateRoom }>Create</Button>
            </div>
            <div className="editOperation">
              <Button size="sm" onClick={ handlerEditRoom }>Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default RoomMenu