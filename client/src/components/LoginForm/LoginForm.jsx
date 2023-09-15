import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './loginstyle.css'

function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', { name, password });
      console.log(response.data);
      if (response.data === 'Login successful') {
        // Redirect to admin panel
        navigate('/admin');
      } else {
        // Handle failed login here
        setError(response.data);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };
  return (
    <div className="wrapper">
      <div className="LoginForm">
        <div className="login-head">ADMIN LOGIN</div>
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            { <p>{error}</p>}
            <div className="login-btn">
              <button type="submit" placeholder="LOGIN">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
