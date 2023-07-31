import React from "react";
import ConnectButton from "./ConnectButton";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./styles.css";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  return (
    <Navbar className="navbar">
      <Container>
        <Link to="/home" style={{"textDecoration":"none"}}>
          <div className="text-wrapper">Graze</div>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ConnectButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderComponent;
