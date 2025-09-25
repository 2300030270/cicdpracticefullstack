import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddAc() {
  const [formData, setFormData] = useState({
    brand: "",
    serialNumber: "",
    price: "",
    color: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.url}/add`, formData);
      setMessage(res.data);
      setError("");
      setFormData({ brand: "", serialNumber: "", price: "", color: "" });
    } catch (err) {
      // Safely extract error message
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || err.message || "Unexpected error");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add AC</h2>
      {message && <p style={{ color: "green" }}>{typeof message === 'string' ? message : JSON.stringify(message)}</p>}
      {error && <p style={{ color: "red" }}>{typeof error === 'string' ? error : JSON.stringify(error)}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand:</label>
          <input id="brand" value={formData.brand} onChange={handleChange} required />
        </div>

        <div>
          <label>Serial Number:</label>
          <input id="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
        </div>

        <div>
          <label>Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Color:</label>
          <input id="color" value={formData.color} onChange={handleChange} required />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
