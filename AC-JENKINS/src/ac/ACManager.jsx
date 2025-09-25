import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import "./style.css";

const ACManager = () => {
  const [acs, setAcs] = useState([]);
  const [ac, setAc] = useState({
    id: "",
    brand: "",
    serialNumber: "",
    price: "",
    color: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedAc, setFetchedAc] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const baseUrl = config.url; // e.g., http://localhost:2030

  // Fetch all ACs on mount
  useEffect(() => {
    fetchAllAcs();
  }, []);

  const fetchAllAcs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setAcs(res.data);
    } catch (err) {
      setError("Failed to fetch ACs");
    }
  };

  const handleChange = (e) => {
    setAc({ ...ac, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in ac) {
      if (key !== "id" && (!ac[key] || ac[key].toString().trim() === "")) {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addAc = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, ac);
      setMessage("AC added successfully.");
      setError("");
      fetchAllAcs();
      resetForm();
    } catch (err) {
      setError("Error adding AC.");
      setMessage("");
    }
  };

  const updateAc = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update/${ac.id}`, ac);
      setMessage("AC updated successfully.");
      setError("");
      fetchAllAcs();
      resetForm();
    } catch (err) {
      setError("Error updating AC.");
      setMessage("");
    }
  };

  const deleteAc = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      setError("");
      fetchAllAcs();
    } catch (err) {
      setError("Error deleting AC.");
      setMessage("");
    }
  };

  const getAcById = async () => {
    if (!idToFetch) return;
    try {
      const res = await axios.get(`${baseUrl}/view/${idToFetch}`);
      setFetchedAc(res.data);
      setMessage("");
      setError("");
    } catch (err) {
      setFetchedAc(null);
      setError("AC not found.");
      setMessage("");
    }
  };

  const handleEdit = (acItem) => {
    setAc(acItem);
    setEditMode(true);
    setMessage(`Editing AC with ID ${acItem.id}`);
    setError("");
  };

  const resetForm = () => {
    setAc({
      id: "",
      brand: "",
      serialNumber: "",
      price: "",
      color: ""
    });
    setEditMode(false);
  };

  return (
    <div className="ac-container">
      {message && <div className="message-banner success">{message}</div>}
      {error && <div className="message-banner error">{error}</div>}

      <h2>AC Management</h2>

      {/* Add / Edit Form */}
      <div>
        <h3>{editMode ? "Edit AC" : "Add AC"}</h3>
        <div className="form-grid">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={ac.brand}
            onChange={handleChange}
          />
          <input
            type="text"
            name="serialNumber"
            placeholder="Serial Number"
            value={ac.serialNumber}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={ac.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={ac.color}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addAc}>
              Add AC
            </button>
          ) : (
            <>
              <button className="btn-green" onClick={updateAc}>
                Update AC
              </button>
              <button className="btn-gray" onClick={resetForm}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get AC By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getAcById}>
          Fetch
        </button>
        {fetchedAc && (
          <div>
            <h4>AC Found:</h4>
            <pre>{JSON.stringify(fetchedAc, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All ACs Table */}
      <div>
        <h3>All ACs</h3>
        {acs.length === 0 ? (
          <p>No ACs found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Serial Number</th>
                  <th>Price</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {acs.map((acItem) => (
                  <tr key={acItem.id}>
                    <td>{acItem.id}</td>
                    <td>{acItem.brand}</td>
                    <td>{acItem.serialNumber}</td>
                    <td>{acItem.price}</td>
                    <td>{acItem.color}</td>
                    <td>
                      <button
                        className="btn-green"
                        onClick={() => handleEdit(acItem)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-red"
                        onClick={() => deleteAc(acItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ACManager;
