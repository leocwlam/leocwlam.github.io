import React, { useContext } from 'react'
import {Button, Modal } from 'react-bootstrap'

function LeaveRoom(props) {
  const popupLeaveRoomContext = useContext(props.popupLeaveRoomContext)
  const onAfterLeaveRoomProcess = props.onAfterLeaveRoomProcess
  
  const handlePopupConfirmLeaveRoomClose = () => { popupLeaveRoomContext.setPopupConfirmLeaveRoomShow(false) }

  const handleLeaveRoomProcess = () => {
    if (typeof onAfterLeaveRoomProcess === 'function') {
      onAfterLeaveRoomProcess()
    }
    handlePopupConfirmLeaveRoomClose()
  }

  return (
    <Modal show={popupLeaveRoomContext.popupConfirmLeaveRoomShow} onHide={handlePopupConfirmLeaveRoomClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Confirm to leave {popupLeaveRoomContext.inRoom} room
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={handleLeaveRoomProcess}>
          Yes
        </Button>
        <Button variant="secondary" size="sm" onClick={handlePopupConfirmLeaveRoomClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LeaveRoom