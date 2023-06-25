import React, { useState } from "react";
import { Button, Modal, Navbar } from "react-bootstrap";
import git_icon from "../assets/git_icon.png";
import HistoryModal from "./HistoryModal";

const NavBar = () => {
  const [show, setShow] = useState(false);

  return (
    <Navbar className="d-flex justify-content-between">
      <Navbar.Brand href="#home">
        <img
          src={git_icon}
          width="30"
          height="30"
          className="d-inline-block align-top mx-2"
          alt="React Bootstrap logo"
        />
        <span>GitFindr</span>
      </Navbar.Brand>

      <Button onClick={() => setShow(true)} className="btn-success">
        Search History
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Users you searched for</p>
          <HistoryModal />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default NavBar;
