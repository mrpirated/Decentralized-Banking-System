import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './ProductsList';
import { UserNavbar } from './UserNavbar';

function ProductPurchase() {
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Products List" columns={columns}/>
        </div>
    )
}

export default ProductPurchase
