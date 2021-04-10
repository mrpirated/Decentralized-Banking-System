import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { column } from './Takeloanlist';
import { UserNavbar } from './UserNavbar';
import axios from "axios";

const config = require("../../../config/apipaths.json");

function TakeLoan() {
    
   
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Take Loan" actions={actions} columns={column} />
        </div>
    )
}

export default UsertoUser
