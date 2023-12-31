import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Bar from './appBar';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Process the response here, if needed
      const data = await response.json();
      const token = data.token
      localStorage.setItem('token', token);
      navigate('/login'); 
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
     <Bar/>
      <div style={{ marginTop: "50px" }}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button variant="contained" onClick={handleSignUp}>
        Signup
      </Button>
    </>
  );
}

export default Signup;
