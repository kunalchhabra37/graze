import React from "react";
import ConnectButton from "./ConnectButton";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./styles.css";

const HeaderComponent = () => {
  return (
    <Navbar className="navbar">
      <Container>
        <div className="text-wrapper">Graze</div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ConnectButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderComponent;
