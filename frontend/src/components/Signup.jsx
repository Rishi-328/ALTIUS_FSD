import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        username: user,
        password: password,
      });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      alert('Signup Successful');
    } catch (err) {
      console.error(err);
      alert('Signup Failed');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column" style={{ background: '#fff' }}>
      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
              <h2 className="text-center mb-4 text-primary">Signup</h2>
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
                  Signup
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
