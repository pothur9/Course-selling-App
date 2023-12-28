import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Bar from './appBar';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('token', token);

      navigate('/courses'); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Bar/>
      <div style={{ marginTop: '50px' }}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
}

export default Login;
