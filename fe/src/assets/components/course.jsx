import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Course() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const handleAddCourse = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const response = await fetch('http://localhost:3000/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ title, description, price, image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Process the response here, if needed
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <Button variant="contained" onClick={handleAddCourse}>
        Add course
      </Button>
    </>
  );
}

export default Course;
