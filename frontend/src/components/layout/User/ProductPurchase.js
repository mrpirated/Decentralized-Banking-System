import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './ProductsList';
import { UserNavbar } from './UserNavbar';
import axios from "axios";

const config = require("../../../config/apipaths.json");

function ProductPurchase() {
    useEffect(() => {
        //console.log(config.getAllUsers);
        async function fetchData() {
            const result = await axios
                .get(config.getAllUsers)
                .then((res) => {
                    console.log("hello");
                    console.log(res.data);
                    let temp = [];
                    //console.log(items[0].Line);
                    for (let i = 0; i < res.data.length; i++) {
                        let t = {
                            num: i + 1,
                            userId: res.data[i].id
                        };
                        temp.push(t);
                    }
                    setData(temp);
                }).catch((err) => {
                    console.log(err);
                });
            console.log(result);
        }
        fetchData();
	}, []);


    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <DataTable title="Products List" columns={columns}/>
        </div>
    )
}

export default ProductPurchase
