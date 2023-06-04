import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";

function ModalHapus(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleHapus = () => {
    props.onConfirm();
    handleClose();
  };

  return (
    <>
      <Button variant="danger" className="btn btn-sm" onClick={handleShow}>
        <i className="fa-solid fa-trash-can" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus data {props.nama}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleHapus}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalHapus;
