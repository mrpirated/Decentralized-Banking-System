import React from 'react'
import {Link} from 'react-router-dom'
import '../style.css'
const Navbar = (props) => {
    const titles = props.titles;
    return (
        <div>
            <nav>
                <ul id = "nav">
                    {titles.map((item, index) => {
                    return (
                        <li key={index}>
                            <li><Link to={item.url} >{ item.title}</Link></li>
                        </li>
                    )
                })}
                </ul>   
            </nav>
        </div>
    )
}
export default Navbar
