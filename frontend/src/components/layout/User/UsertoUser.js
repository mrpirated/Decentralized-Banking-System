import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { column } from './UsertoUserList';
import { UserNavbar } from './UserNavbar';
import axios from "axios";
import Popup from './UserToUserTransactionPopup';

const config = require("../../../config/apipaths.json");

function UsertoUser() {
    const [data, setData] = useState([{}]);
    const [openPopup, setOpenPopup] = useState(false);
    const [RowData, setRowData] = useState();
    const history = useHistory();
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
            <DataTable title="Users List" actions={actions} columns={column} data={data}/>
        </div>
    )
}

export default UsertoUser
