import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
export const CreateNftComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isBlade, setIsBlade] = useState(true);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description: desc,
      image,
      receiverAddress: address,
    };
    try {
      let url;
      if (!isBlade) {
        url = "http://127.0.0.1:6969/api/nft/send/grass/" + projectId;
      }
      else {
        url = "http://127.0.0.1:6969/api/nft/send/blade/" + projectId;
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
      navigate('/viewProject', { state: { projectId } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 style={{ color: "white" }}>Create NFT</h1>
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
          <Form.Label>Address</Form.Label>
          <input
            className="inputs"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Check
            type="checkbox"
            label="IsBlade?"
            checked={isBlade}
            onChange={() => setIsBlade(!isBlade)}
          />
        </Form.Group>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </Form>
    </>
  );
};
