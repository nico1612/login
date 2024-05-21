import React from "react";
import { Modal, Button } from "react-bootstrap";

export const MyModal = ({ show, handleClose, texto, boton, cabecera }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Usuario {cabecera}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{texto}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          {boton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
