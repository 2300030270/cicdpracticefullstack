import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddAc() {
  const [formData, setFormData] = useState({
    brand: "",
    serialNo: "",
    model: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/add`, formData);
      setMessage(response.data);
      setError("");
      setFormData({ brand: "", serialNo: "", model: "" });
    } catch (err) {
      setError(err.response ? err.response.data : "Unexpected error");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add AC</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand:</label>
          <input id="brand" value={formData.brand} onChange={handleChange} required />
        </div>
        <div>
          <label>Serial No:</label>
          <input id="serialNo" value={formData.serialNo} onChange={handleChange} required />
        </div>
        <div>
          <label>Model:</label>
          <input id="model" value={formData.model} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
