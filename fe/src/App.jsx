import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Course from "./components/addCourse";
import Courses from "./components/courses";
import Updatec from "./components/updatecourse";
import UserSignup from "./components/userSignup";
import UserLogin from "./components/userLogin";
import UserCourses from "./components/userCourses";
import PurchasedCourses from "./components/purchasedCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcourse" element={<Course />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/updatecourse/:courseID" element={<Updatec />} />
        <Route path="/user/signup" element={<UserSignup/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/user/courses" element={<UserCourses/>} />
        <Route path="/user/purchased" element={<PurchasedCourses/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
