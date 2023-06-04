import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ({ isOpen, onClose, onEventAdded }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tambah Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Event</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="event-title">Title</label>
              <input
                type="text"
                className="form-control"
                id="event-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-start">Start</label>
              <input
                type="datetime-local"
                className="form-control"
                id="event-start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-end">End</label>
              <input
                type="datetime-local"
                className="form-control"
                id="event-end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
