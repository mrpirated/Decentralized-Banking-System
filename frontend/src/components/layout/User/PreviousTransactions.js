import React from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './TransactionList';
import { UserNavbar } from './UserNavbar';

function PreviousTransactions() {
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Transaction Table" columns={columns}/>
        </div>
    )
}

export default PreviousTransactions
