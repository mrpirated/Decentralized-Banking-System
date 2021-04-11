import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { columns } from './ChangeProductList';
import { CompanyNavbar } from './CompanyNavbar';
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import Popup from './ChangeProductDetailsPopup';

const config = require("../../../config/apipaths.json");

function UsertoUser() {
    const [data, setData] = useState([{}]);
    const [openPopup, setOpenPopup] = useState(false);
    const [RowData, setRowData] = useState();
    const { UserId } = useAuth();
    const history = useHistory();
    useEffect(() => {
        //console.log(config.getAllUsers);
        async function fetchData() {
            console.log(UserId);
            const result = await axios
                .get(config.getProductsbyCompany, {
                    params: {
                        CompanyId: UserId
                    }
                })
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
                            cost_price: res.data[i].cost_price,
                            selling_price: res.data[i].selling_price,
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
            <Navbar titles={CompanyNavbar}></Navbar>
            <Popup
				rowData={RowData}
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			></Popup>
            <DataTable title="Users List" actions={actions} columns={columns} data={data}/>
        </div>
    )
}

export default UsertoUser
