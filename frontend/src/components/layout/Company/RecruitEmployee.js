import React, {useState, useEffect} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { column } from '../User/UsertoUserList';
import { CompanyNavbar } from './CompanyNavbar';
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
//import Popup from './UserToUserTransactionPopup';

const config = require("../../../config/apipaths.json");

function RecruitEmployee() {
    const [data, setData] = useState([{}]);
    const { UserId } = useAuth();
    useEffect(() => {
        //console.log(config.getAllUsers);
        console.log("entered");
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

    const handleSubmit = async (rowData) => {
        await axios
			.post(config.recruitEmployee, {
                userId: rowData.userId,
                companyId: UserId,
            })
            .then((res) => {
                console.log(res);
                alert(res.data);
            })
			.catch((err) => console.log(err));
    };

    const actions = [
		{
			icon: "more",
			tooltip: "More Details",
            onClick: (event, rowData) => {
                handleSubmit(rowData);
			},
		},
	];

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={CompanyNavbar}></Navbar>
            <DataTable title="Users List" actions={actions} columns={column} data={data}/>
        </div>
    )
}

export default RecruitEmployee
