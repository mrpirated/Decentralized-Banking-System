import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { column } from './UsertoUserList';
import { UserNavbar } from './UserNavbar';

function UsertoUser() {
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Transaction Ledger" columns={column}/>
        </div>
    )
}

export default UsertoUser
