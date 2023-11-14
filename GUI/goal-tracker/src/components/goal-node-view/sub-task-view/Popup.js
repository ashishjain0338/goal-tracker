import React from "react";
import { Modal } from "react-bootstrap";
function Popup(props){
    return (
        <div>
            <Modal show={props.show} onHide={props.onHide} size="md" centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>
                        {props.title}
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Popup;

