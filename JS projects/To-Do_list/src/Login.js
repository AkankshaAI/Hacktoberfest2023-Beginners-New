
import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Login</h2>
          <form>
            <div className="form-group my-3">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" placeholder="Enter your username" />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-primary my-2">Login</button>
            <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
          </form>
        </div>
      </div>
    </div> 
  );

}

export default Login
