import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";
import pic from "./image.jpeg";
import add_icon from "./add_icon.svg";
import { DisplayBlade } from "./DisplayBladeComponent";
import { DisplayDashboard } from "./DisplayDashboardComponent";
export const ViewProjectComponent = () => {
  const location = useLocation();
  const { projectId } = location.state;
  const [isBlade, setIsBlade] = useState(true);
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Container className="contain">
            <div className="card-text">Test</div>
            <img src={pic} alt="project" className="img" />
            <div className="card-desc">3dxn19e9..s</div>
          </Container>
          <Container className="contain" style={{ marginTop: "20px" }}>
            <div className="card-text">Test</div>
            <div className="card-desc">3dxn19e9..s</div>
          </Container>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={2}>
              <button
                className="card-text"
                style={{ marginLeft: "5px", color: isBlade ? "#fff" : "#979292" }}
                onClick={() => setIsBlade(true)}
              >
                Blade
              </button>
            </Col>
            <Col md={2}>
              <button
                className="card-text"
                style={{color: !isBlade ? "#fff" : "#979292" }}
                onClick={() => setIsBlade(false)}
              >
                Dashboard
              </button>
            </Col>
            <Col md={7}></Col>
            <Col md={1}>
              <img src={add_icon} alt="add" height={40} width={135} />
            </Col>

            <hr style={{ color: "white", margin: "0.6rem 1rem" }} />
          </Row>
          <Container className="contain">
            {isBlade ? (
              <DisplayBlade projectId={projectId} />
            ) : (
              <DisplayDashboard projectId={projectId} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
