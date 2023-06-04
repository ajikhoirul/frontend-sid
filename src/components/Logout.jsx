import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Logout(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    props.onConfirm();
    handleClose();
  };

  return (
    <>
      <Button variant="danger" className="nav-link" onClick={handleShow}>
        <i className="text-white nav-icon fa-solid fa-right-from-bracket" />
        <p className="text-white">Logout</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
