import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import ViewAllAcs from './ViewAllAcs';

export default function ViewAllAcs() {
  const [acs, setAcs] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({ brand: "", serialNo: "", model: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all ACs
  const fetchAll = async () => {
    try {
      const res = await axios.get(`${config.url}/viewall`);
      setAcs(res.data);
    } catch (err) {
      setError("Failed to fetch ACs");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // View AC by ID
  const handleViewById = async () => {
    if (!selectedId) return;
    try {
      const res = await axios.get(`${config.url}/view/${selectedId}`);
      setFormData(res.data);
      setMessage("");
      setError("");
    } catch (err) {
      setError("AC not found");
      setMessage("");
    }
  };

  // Update AC
  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      const res = await axios.put(`${config.url}/update/${selectedId}`, formData);
      setMessage(res.data);
      setError("");
      fetchAll();
    } catch (err) {
      setError("Update failed");
      setMessage("");
    }
  };

  // Delete AC
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.url}/delete/${id}`);
      setMessage(res.data);
      fetchAll();
    } catch (err) {
      setError("Deletion failed");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage ACs</h2>

      {/* View / Update by ID */}
      <div>
        <input
          type="number"
          placeholder="Enter AC ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        />
        <button onClick={handleViewById}>View by ID</button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Brand:</label>
        <input id="brand" value={formData.brand} onChange={handleChange} />
        <label>Serial No:</label>
        <input id="serialNo" value={formData.serialNo} onChange={handleChange} />
        <label>Model:</label>
        <input id="model" value={formData.model} onChange={handleChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <h3>All ACs</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Serial No</th>
            <th>Model</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {acs.map((ac) => (
            <tr key={ac.id}>
              <td>{ac.id}</td>
              <td>{ac.brand}</td>
              <td>{ac.serialNo}</td>
              <td>{ac.model}</td>
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
