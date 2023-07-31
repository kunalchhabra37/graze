import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./styles.css";
import { useNavigate } from "react-router-dom";
export const CreateProjectComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bladeImage, setBladeImage] = useState("");
  const [grassImage, setGrassImage] = useState("");
  const [attributes, setAttributes] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description: desc,
      bladeImage,
      grassImage,
    };
    try {
      const response = await fetch('http://127.0.0.1:6969/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 style={{ color: "white" }}>Create Project</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Name</Form.Label>
          <input
            className="inputs"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Description</Form.Label>
          <input
            className="inputs"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Blade Image URL</Form.Label>
          <input
            className="inputs"
            type="text"
            value={bladeImage}
            onChange={(e) => setBladeImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Grass Image URL</Form.Label>
          <input
            className="inputs"
            type="text"
            value={grassImage}
            onChange={(e) => setGrassImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Attributes (Optional)</Form.Label>
          <input
            className="inputs"
            type="text"
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
          />
        </Form.Group>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </Form>
    </>
  );
};
