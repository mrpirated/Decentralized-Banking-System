import React from 'react'
import {Link} from 'react-router-dom'

export const Login = () => {
    return (
        <div>
            <h1 className="large text-primary">Sign In</h1>

       <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
       <form className="form" action="dashboard.html">

       <div className = "form-group" name = "drop-down">

            <label for="account">Choose account type </label>
            <select name="account" id="account-type">
                <option value="government">government</option>
                <option value="user">user</option>
                <option value="company">company</option>
            </select>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to =  "/register">Sign Up</Link>
        </p>
        </div>
    )
}

export default Login

