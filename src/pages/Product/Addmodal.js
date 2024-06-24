import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../style/Product.css'; // Import the custom CSS

const AddModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Content of your modal goes here...</p>
        <p>More content...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
