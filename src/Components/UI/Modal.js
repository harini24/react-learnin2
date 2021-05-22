import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const BackDrop = props =>{
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}

const ModalOverylay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalEl = document.getElementById('overlays')
const Modal = props =>{
    return <React.Fragment>
        {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />,portalEl)}
        {ReactDOM.createPortal(<ModalOverylay>{props.children}</ModalOverylay>,portalEl)}
    </React.Fragment>
}
export default Modal