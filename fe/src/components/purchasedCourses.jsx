import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = "mm"
        const response = await fetch(`http://localhost:3000/purchasedcourses/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        setPurchasedCourses(responseData.purchasedCourses);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div>
      <h2>Your Purchased Courses</h2>
      {purchasedCourses.map((purchase) => (
        <Card key={purchase._id}>
          <CardContent>
            <Typography variant="h5" component="div">
              {purchase.courseId.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description: {purchase.courseId.description}
            </Typography>
            {/* Add other course details as needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PurchasedCourses;
