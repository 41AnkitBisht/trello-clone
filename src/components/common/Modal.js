import React from 'react'

const Modal = ({children, handleClose}) => {
  return (
    <div id="myModal" className="modal">

    <div className="modal-content">
        {children}
        <span className="close" onClick={handleClose}>&times;</span>
    </div>

    </div>
  )
}

export default Modal