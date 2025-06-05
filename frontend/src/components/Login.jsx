import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Login() {
  const {login} = useContext(AuthContext);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username: user,
        password: password,
      });
      console.log(res.data);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login Failed');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column" style={{ background: '#fff' }}>
      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center align-items-center">
          
          {/* Login Form - Left Side */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
              <h2 className="text-center mb-4 text-primary">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="/Login_icon.jpeg"
              alt="Login Illustration"
              className="img-fluid"
              style={{ maxHeight: '450px', width: '45%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
