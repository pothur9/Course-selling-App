import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Course from "./components/addCourse";
import Courses from "./components/courses";
import Updatec from "./components/updatecourse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcourse" element={<Course />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/updatecourse/:courseID" element={<Updatec />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
