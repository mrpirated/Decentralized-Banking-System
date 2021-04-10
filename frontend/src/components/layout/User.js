import React from 'react'

export const User = () => {
    return (
        <div>
            <form className="form" action="loan">
                <div>
                    <div className = "form-group" name = "drop-down">   

                    <label for="account">Take loan from  </label>
                    <select name="account" id="account-type">
                        <option value="government">government</option>
                        <option value="company">company</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <input type="number" placeholder="Enter the amount" name="amount" />
                    </div>            
                    <input type="submit" className="btn btn-primary" value="Apply for laon" />

                </div>
            </form>
            <div>
            <form className="form" action="Job">
                <div>
                    <div className = "form-group" name = "drop-down">   

                    <label for="account">apply for job in  </label>
                    <select name="account" id="account-type">
                        <option value="government">government</option>
                        <option value="company">company</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <input type="number" placeholder="Enter the company name " name="amount" />
                    </div>            
                    <input type="submit" className="btn btn-primary" value="Apply for job" />

                </div>
            </form>
            </div>
        </div>
    )
}

export default User

