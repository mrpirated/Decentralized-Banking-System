import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { columns } from './ProductsList';
import { UserNavbar } from './UserNavbar';
import axios from "axios";
import Popup from './PurchaseProductPopup';


const config = require("../../../config/apipaths.json");

function ProductPurchase() {
    const [data, setData] = useState([{}]);
    const [openPopup, setOpenPopup] = useState(false);
    const [RowData, setRowData] = useState();
    useEffect(() => {
        //console.log(config.getAllUsers);
        async function fetchData() {
            const result = await axios
                .get(config.getProducts)
                .then((res) => {
                    console.log("hello");
                    console.log(res.data);
                    let temp = [];
                    //console.log(items[0].Line);
                    for (let i = 0; i < res.data.length; i++) {
                        let t = {
                            num: i + 1,
                            productId: res.data[i].id,
                            companyId: res.data[i].company,
                            amount: res.data[i].selling_price,
                            quantity: res.data[i].quantity
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

    const actions = [
		{
			icon: "more",
			tooltip: "More Details",
            onClick: (event, rowData) => {
                console.log(rowData);
                setRowData(rowData);
                setOpenPopup(true);
			},
		},
	];

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={UserNavbar}></Navbar>
            <Popup
				rowData={RowData}
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			></Popup>
            <DataTable title="Products List" actions={actions} columns={columns} data={data}/>
        </div>
    )
}

export default ProductPurchase
