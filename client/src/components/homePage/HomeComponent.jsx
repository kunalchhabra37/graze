import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./styles.css";
import pic from "./image.jpeg";
import plusImg from "./plus.svg";
export const HomePageComp = () => {
  return (
    <>
      <Container className="heading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53"
          height="37"
          viewBox="0 0 53 37"
          fill="none"
        >
          <g opacity="0.5">
            <path
              d="M0 0V9.25H53V4.625H19.875V0H0ZM0 13.875V34.6875C0 35.9825 1.4575 37 3.3125 37H49.6875C51.5425 37 53 35.9825 53 34.6875V13.875H0Z"
              fill="white"
            />
          </g>
        </svg>
        <h1 className="header">Recent Projects</h1>
      </Container>
      <Container fluid>
        <Row className="card-sep">
          <Col md={3} className="cards">
          <Link to="/viewProject" state={{ projectId: "Test" }} className="send">
              <img src={pic} alt="at" />
              <div className="card-text">Test</div>
              <div className="card-desc">3dxn19e9..s</div>
            </Link>
          </Col>
          <Col md={3} className="cards">
            <Link to="/viewProject" state={{ projectId: "Test1" }} className="send">
              <img src={pic} alt="at" />
              <div className="card-text">Test</div>
              <div className="card-desc">3dxn19e9..s</div>
            </Link>
          </Col>
          <Col md={2} className="card-add" align="center">
            <Link to="/createProject" className="send">
              <img src={plusImg} alt="plus" width="86px" />
              <div className="card-text">Add Project</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
