import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./createProject.css";
export const CreateProjectComponent = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [attributes, setAttributes] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <Form.Label>Image URL</Form.Label>
          <input
            className="inputs"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Content Website URL</Form.Label>
          <input
            className="inputs"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Attributes</Form.Label>
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
