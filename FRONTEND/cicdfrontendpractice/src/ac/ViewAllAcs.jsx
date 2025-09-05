import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

export default function ViewAllAcs() {
  const [acs, setAcs] = useState([]);
  const [error, setError] = useState("");

  const fetchAcs = async () => {
    try {
      const response = await axios.get(`${config.url}/viewall`);
      setAcs(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch AC data: " + err.message);
    }
  };

  useEffect(() => {
    fetchAcs();
  }, []);

  const deleteAc = async (aid) => {
    try {
      const response = await axios.delete(`${config.url}/delete/${aid}`);
      toast.success(response.data);
      fetchAcs();
    } catch (err) {
      setError(err.response ? "Failed to delete AC: " + err.response.data : "Deletion failed");
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="container">
      <h3 className="title">View All ACs</h3>

      <ToastContainer position="top-center" autoClose={4000} />

      {error ? (
        <p className="error-message">{error}</p>
      ) : acs.length === 0 ? (
        <p className="error-message">No AC Data Found</p>
      ) : (
        <table className="ac-table">
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
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteAc(ac.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
