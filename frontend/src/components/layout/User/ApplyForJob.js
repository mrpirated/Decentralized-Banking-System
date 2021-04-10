import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './CompanyList';
import { UserNavbar } from './UserNavbar';

function ApplyForJob() {
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Company Name" columns={columns}/>
        </div>
    )
}

export default ApplyForJob
