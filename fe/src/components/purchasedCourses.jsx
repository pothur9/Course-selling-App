import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PurchasedCourses = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage
    console.log(userId)
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        // Check if userId is available before making the API request
        if (!userId) {
          console.error('User ID not available.');
          return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/purchasedcourses/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Purchased Courses before fetching details:', responseData.purchasedCourses);

        const purchasedCourses = responseData.purchasedCourses;

        if (purchasedCourses.length === 0) {
          console.log('No purchased courses available.');
          return;
        }

        // Fetch course details for each purchased course
        const details = await Promise.all(
          purchasedCourses.map(async (purchase) => {
            try {
              const courseDetail = await fetchCourse(purchase.courseId);
              console.log('Course Detail:', courseDetail);
              return courseDetail;
            } catch (error) {
              console.error('Error fetching course details:', error);
              return null;
            }
          })
        );

        console.log('Course Details:', details);

        setCourseDetails(details.filter((detail) => detail !== null));
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    // Call fetchPurchasedCourses when the component mounts
    fetchPurchasedCourses();
  }, [userId]); // Add userId as a dependency

  const fetchCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/getcourse/${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData.course; // Return the course details
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  return (
    <div>
      <h2>Your Purchased Courses</h2>
      {courseDetails.length === 0 ? (
        <p>No purchased courses available.</p>
      ) : (
        courseDetails.map((course, index) => (
          <Card key={index}>
            <CardContent>
              <img src={course.image} alt="course image" />
              <Typography variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description: {course.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PurchasedCourses;
