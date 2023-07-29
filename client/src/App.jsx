import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/header/HeaderComponent";
import { HomePageComp } from "./components/homePage/HomeComponent";
import { LandingPageComponent } from "./components/landingPage/LandingPageComponent";
import { CreateProjectComponent } from "./components/createProject/CreateProjectComponent";
import { ViewProjectComponent } from "./components/viewProject/ViewProjecComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
export default function App() {
  return (
    <BrowserRouter>
      <div className="home">
        <Container>
          <Row>
            <HeaderComponent />
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Routes>
              <Route exact path="/" element={<LandingPageComponent />} />
              <Route path="/home" element={<HomePageComp />} />
              <Route
                path="/createProject"
                element={<CreateProjectComponent />}
              />
              <Route path="/viewProject" element={<ViewProjectComponent />} />
            </Routes>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}
