import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './NewEmployeeList';
import { CompanyNavbar } from './CompanyNavbar';

function ChangeProductdetail() {
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={CompanyNavbar}></Navbar>
            <DataTable title="Recruit New Employee" columns={columns}/>
        </div>
    )
}

export default ChangeProductdetail
