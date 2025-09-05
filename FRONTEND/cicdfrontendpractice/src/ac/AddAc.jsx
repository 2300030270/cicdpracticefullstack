import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddAc() {
  const [formData, setFormData] = useState({
    id: '',
    brand: '',
    serialNumber: '',
    price: '',
    color: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // force uppercase for brand, serialNumber, color
  const handleCase = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toUpperCase() });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, price: parseFloat(formData.price) };
      const response = await axios.post(`${config.url}/add`, payload);
      if (response.status === 200) {
        setMessage(response.data);
        setFormData({
          id: '',
          brand: '',
          serialNumber: '',
          price: '',
          color: ''
        });
        setError('');
      }
    } catch (err) {
      setMessage('');
      setError(err.response ? err.response.data : "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add AC</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>AC ID</label>
          <input
            type="number"
            id="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>AC Brand</label>
          <input
            type="text"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <div>
          <label>Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Color</label>
          <input
            type="text"
            id="color"
            value={formData.color}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
