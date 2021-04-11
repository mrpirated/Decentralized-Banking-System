import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import DataTable from "../DataTable";
const config = require("../../../config/apipaths.json");
export default function Popup(props) {
    const { UserId } = useAuth();
    const {
        rowData,
        openPopup,
        setOpenPopup
    } = props;
    const [costPrice, setCostPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
	const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios
			.post(config.changeProductDetails, {
                productId: rowData.productId,
                cost_price: costPrice,
                selling_price: sellingPrice,
                quantity: quantity
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        alert('Details Updated.');
        setOpenPopup(false);
    };
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>User To User Transaction</div>
            </DialogTitle>
            <DialogContent>
                <form>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Product ID:
                        </label>
                        {openPopup && <label>{rowData.productId}</label>}
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Company Id:
                        </label>
                        {openPopup && <label>{rowData.companyId}</label>}
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Cost Price:
                        </label>
                        <input
                            type='text'
                            value={costPrice}
                            style={{ marginRight: "90px" }}
                            onChange={(event) => (setCostPrice(event.target.value))}
                        />
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Selling Price:
                        </label>
                        <input
                            type='text'
                            value={sellingPrice}
                            style={{ marginRight: "90px" }}
                            onChange={(event) => (setSellingPrice(event.target.value))}
                        />
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Quantity:
                        </label>
                        <input
                            type='text'
                            value={quantity}
                            style={{ marginRight: "90px" }}
                            onChange={(event) => (setQuantity(event.target.value))}
                        />
                    </div>
                    <Button style={{marginRight: "25px"}} onClick={handleSubmit} className='btn btn-primary'>Make Transaction</Button>
                    <Button onClick={()=>(setOpenPopup(false))} className='btn btn-primary'>Close</Button>
                </form>

            </DialogContent>
        </Dialog>
	);
}
