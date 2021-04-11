import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './ProductDetailsList';
import { CompanyNavbar } from './CompanyNavbar';

function ChangeProductdetail() {
    
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={CompanyNavbar}></Navbar>
            <DataTable title="Change Product Detail" columns={columns}/>
        </div>
    )
}

export default ChangeProductdetail
