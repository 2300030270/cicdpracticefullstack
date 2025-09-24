import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function ViewAllAcs() {
  const [acs, setAcs] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({ brand: "", serialNumber: "", price: "", color: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all ACs
  const fetchAll = async () => {
    try {
      const res = await axios.get(`${config.url}/viewall`);
      setAcs(res.data);
    } catch (err) {
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || err.message || "Failed to fetch ACs");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleViewById = async () => {
    if (!selectedId) return;
    try {
      const res = await axios.get(`${config.url}/view/${selectedId}`);
      setFormData(res.data);
      setMessage("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || "AC not found");
      setMessage("");
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      const res = await axios.put(`${config.url}/update/${selectedId}`, formData);
      setMessage(res.data);
      setError("");
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || "Update failed");
      setMessage("");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.url}/delete/${id}`);
      setMessage(res.data);
      setError("");
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || "Deletion failed");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage ACs</h2>

      <div>
        <input
          type="number"
          placeholder="Enter AC ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
        <button onClick={handleViewById}>View by ID</button>
      </div>

      {message && <p style={{ color: "green" }}>{typeof message === 'string' ? message : JSON.stringify(message)}</p>}
      {error && <p style={{ color: "red" }}>{typeof error === 'string' ? error : JSON.stringify(error)}</p>}

      <div>
        <label>Brand:</label>
        <input id="brand" value={formData.brand} onChange={handleChange} />
        <label>Serial Number:</label>
        <input id="serialNumber" value={formData.serialNumber} onChange={handleChange} />
        <label>Price:</label>
        <input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
        <label>Color:</label>
        <input id="color" value={formData.color} onChange={handleChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <h3>All ACs</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Serial Number</th>
            <th>Price</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {acs.map((ac) => (
            <tr key={ac.id}>
              <td>{ac.id}</td>
              <td>{ac.brand}</td>
              <td>{ac.serialNumber}</td>
              <td>{ac.price}</td>
              <td>{ac.color}</td>
              <td>
                <button onClick={() => handleDelete(ac.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
