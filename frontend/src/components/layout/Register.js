import React  from 'react'
import {Link} from 'react-router-dom'

export const Register = () => {
    return (
        <div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html">

            <div className = "form-group" name = "drop-down">

                <label for="account">Choose account type </label>
                <select name="account" id="account-type">
                    <option value="government">government</option>
                    <option value="user">user</option>
                    <option value="company">company</option>
                </select>
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
            />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to = '/login'>Sign In</Link>
        </p>
        </div>
    )
}

export default Register
