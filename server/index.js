const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');


const app = express();
app.use(cors()); 
app.use(express.json());

const port = 3000;
const SECRET = "dfsd2";

//auth middlewar
const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Use split(' ') to split by space
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded; // Use the decoded argument
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

//database
mongoose
  .connect(
    "mongodb+srv://chowdaryp697:Prasanna@cluster0.pdtmjr8.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Ecom",
    }
  )
  .then(() => {
    console.log(`Db connected successfully`);
  })
  .catch((error) => {
    console.log(`Db connection failed`);
    console.error(error);
    process.exit(1);
  });

//data base schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    return res.status(403).json({ message: "admin already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.json({ message: "admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(403).json({ message: "invalid username or password" });
  }
  try {
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "login successfull", token });
    } else {
      res.status(500).json({ message: "invalid username or password" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/course", authJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "course created successfully ", courseId: course.id });
});

app.get("/getcourse", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/course/:courseID", authJwt, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseID,
      req.body,
      { new: true }
    );
    if (course) {
      res.json({ message: "Course updated", course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/course/:courseID", authJwt, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseID);
    if (course) {
      res.json({ message: "Course deleted successfully", course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
