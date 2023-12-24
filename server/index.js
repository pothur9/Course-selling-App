const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const port = 3000;
const SECRET = 'dfsd2';

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
  password: String
});

const Admin = mongoose.model("Admin", adminSchema);

app.post("/signup", async(req, res) => {
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(403).json({ message: "invalid username or password" });
  }
try{
 const passwordMatch = await bcrypt.compare(password,admin.password)
 if(passwordMatch){
  const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
  res.json({message:"login successfull",token})
}else{
  res.status(500).json({message:"invalid username or password"})
}
}catch(error){
  console.log(error)
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
