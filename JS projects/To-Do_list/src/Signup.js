import React from 'react';

const Signup = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-primary my-3">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

