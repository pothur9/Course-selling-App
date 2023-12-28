import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/getcourse", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        if (!Array.isArray(responseData.courses)) {
          throw new Error("Invalid data structure: expected an array");
        }

        setCourses(responseData.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const Detele = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/course/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Course deleted successfully:", responseData);
      fetchData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
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
          <Button
            color="inherit"
            component={Link}
            to="/login"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex" }}>
        {courses.map((course) => (
          <Card key={course._id} sx={{ minWidth: 275 }}>
            <CardContent>
              <img src={course.image} alt="image" style={{ width: "275px" }} />
              <Typography variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description: {course.description}
              </Typography>
              <Typography variant="body2">Price: {course.price}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to={{
                  pathname: `/updatecourse/${course._id}`,
                  state: { course },
                }}
              >
                Update
              </Button>
              <Button size="small" onClick={() => Detele(course._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}
