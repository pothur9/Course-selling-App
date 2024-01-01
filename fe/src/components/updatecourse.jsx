import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Updatec() {
  const { courseID } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); 

  const { course } = location.state || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setPrice(course.price || '');
      setImage(course.image || '');
    }

    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const courseId = course ? course._id : courseID; 
        console.log("Fetching course data for courseId:", courseId);
        const response = await fetch(`http://localhost:3000/getcourse/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          // Check if the response is valid JSON
          try {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
          } catch (jsonError) {
            console.error('Error parsing error response as JSON:', jsonError);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
    
        // Check if the response is valid JSON
        try {
          const data = await response.json();
          console.log("Fetched course data:", data.course);
    
          // Use try-catch to handle asynchronous state updates
          try {
            setTitle(data.course.title);
            setDescription(data.course.description);
            setPrice(data.course.price);
            setImage(data.course.image);
            console.log("State updated successfully");
          } catch (error) {
            console.error('Error updating state:', error);
          }
        } catch (jsonError) {
          console.error('Error parsing response as JSON:', jsonError);
          throw new Error('Invalid JSON response');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    

    fetchCourseData();
  }, [courseID, course]);

  const handleUpdateCourse = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/course/${courseID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
      }

      const updatedData = await response.json();
      console.log('Course updated successfully:', updatedData);

      navigate('/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleLogout = () => {
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
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '50px' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleUpdateCourse}>
        Update Course
      </Button>
    </>
  );
}

export default Updatec;
