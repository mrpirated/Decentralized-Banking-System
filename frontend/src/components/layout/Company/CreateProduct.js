import React, {useState} from 'react'
import DataTable from '../DataTable'
import Navbar from '../Navbar';
import { CompanyNavbar } from './CompanyNavbar';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const config = require("../../../config/apipaths.json");

function CreateProduct() {
    const [ProductName, setProductName] = useState("");
    const [CostPrice, setCostPrice] = useState(0);
    const [SellingPrice, setSellingPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const { UserId } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios
			.post(config.createProduct, {
                cost_price: CostPrice,
                selling_price:SellingPrice,
                quantity:Quantity,
                companyId: UserId,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));


	};

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Navbar titles={CompanyNavbar}></Navbar>
            <div style={{ width: "50%", margin: "0 auto" }}>
                <h1 style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						padding: "0px 0px 25px",
                }}>Change Product Details</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "25px 0px",
                            padding: "0px 0px 25px",
                        }}>
                        <label style={{paddingRight: "25px"}}>Product ID:</label>
                        <input type='text' value={ProductName} onChange={(event) => setProductName(event.target.value)}/>
                    </div>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "25px 0px",
                            padding: "0px 0px 25px",
                        }}>
                        <label style={{paddingRight: "25px"}}>Cost Price:</label>
                        <input type='text' value={CostPrice} onChange={(event) => setCostPrice(event.target.value)}/>
                    </div>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "25px 0px",
                            padding: "0px 0px 25px",
                        }}>
                        <label style={{paddingRight: "25px"}}>Selling Price:</label>
                        <input type='text' value={SellingPrice} onChange={(event) => setSellingPrice(event.target.value)}/>
                    </div>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "25px 0px",
                            padding: "0px 0px 25px",
                        }}>
                        <label style={{paddingRight: "25px"}}>Quantity:</label>
                        <input type='text' value={Quantity} onChange={(event) => setQuantity(event.target.value)}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "25px 0px",
                            padding: "0px 0px 25px",
                        }}
                    >
                        <input type='submit' className='btn btn-primary' value='Submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
