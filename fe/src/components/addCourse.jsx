import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
  const handleLogout = () => {
    // Perform logout logic (clear token, etc.)
    localStorage.removeItem('token');
  };

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course App
          </Typography>
          <Button color="inherit" component={Link} to="/addcourse">
           Add course
          </Button>
          <Button color="inherit"  component={Link} to="/login" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>  
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
