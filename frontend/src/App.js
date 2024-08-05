import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !file) {
      setMessage('Please fill out all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('nama', firstName);
    formData.append('photo', file);

    try {
      const response = await axios.post('http://localhost:5000/upload-image', formData, {
        method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data"
          }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Id:</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div> */}
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;