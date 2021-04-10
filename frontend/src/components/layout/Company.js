import React from 'react'

export const Company = () => {
    return (
        <div>
             <form className="form" action="loan">
                <div>
                    <div className = "form-group" name = "drop-down">   

                    <label for="account">Take loan from  </label>
                    <select name="account" id="account-type">
                        <option value="government">government</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <input type="number" placeholder="Enter the amount" name="amount" />
                    </div>            
                    <input type="submit" className="btn btn-primary" value="Apply for laon" />
                </div>
                
            </form>
        </div>
    )
}

export default Company