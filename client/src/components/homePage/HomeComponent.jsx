import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./styles.css";
import plusImg from "./plus.svg";
export const HomePageComp = () => {
  const [projects, setProjects] = React.useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:6969/api/projects/fetch/all")
      .then((response) => response.json())
      .then((data) => setProjects(data.result))
      .catch((error) => console.error(error));
  }, []);
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
          {Array.isArray(projects) &&
            projects.map((project) => (
              <Col md={3} className="cards" key={project.projectId}>
                <Link
                  to="/viewProject"
                  state={{ projectId: project.projectId }}
                  className="send"
                >
                  <img src={project.image} alt="at" />
                  <div className="card-text">{project.name}</div>
                  <div className="card-desc">{project.description}</div>
                  <div className="card-mint">{project.grassMintAddress}</div>
                </Link>
              </Col>
            ))}
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
