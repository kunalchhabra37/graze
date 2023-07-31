import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";
import add_icon from "./add_icon.svg";
import { DisplayBlade } from "./DisplayBladeComponent";
import { DisplayDashboard } from "./DisplayDashboardComponent";
export const ViewProjectComponent = () => {
  const location = useLocation();
  const { projectId } = location.state;
  const [bladeData, setBladeData] = useState({});
  const [grassData, setGrassData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:6969/api/projects/fetch/${projectId}`
      );
      const data = await response.json();
      setBladeData(data.bladeProject);
      setGrassData(data.grassProject);
      if (!bladeData.nfts.results) {
        bladeData.nfts.results = [];
      }
      if (!grassData.nfts.results) {
        grassData.nfts.results = [];
      }
      console.log(bladeData);
    };
    fetchData();
  }, [projectId]);
  const [isBlade, setIsBlade] = useState(true);
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Container className="contain">
            <div className="card-text">{bladeData.name}</div>
            <img src={bladeData.image} alt="project" className="img" />
            <div className="card-desc">{bladeData.description}</div>
          </Container>
          <Container className="contain" style={{ marginTop: "20px" }}>
            <div className="card-mint">Blade Mint Address :</div>
            <div className="card-mints">{bladeData.mintAddress}</div>
            <div className="card-mint">Grass Mint Address :</div>
            <div className="card-mints">{grassData.mintAddress}</div>
          </Container>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={2}>
              <button
                className="card-text"
                style={{
                  marginLeft: "5px",
                  color: isBlade ? "#fff" : "#979292",
                }}
                onClick={() => setIsBlade(true)}
              >
                Blade
              </button>
            </Col>
            <Col md={2}>
              <button
                className="card-text"
                style={{ color: !isBlade ? "#fff" : "#979292" }}
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
              <DisplayBlade data={bladeData.nfts.results} />
            ) : (
              <DisplayDashboard data={grassData.nfts.results} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
