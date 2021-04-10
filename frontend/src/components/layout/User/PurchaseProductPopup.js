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
    const [quantity, setQuantity] = useState(0);
	const {
        rowData,
        openPopup,
        setOpenPopup
    } = props;
	const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios
			.post(config.productPurchase, {
                productId: rowData.productId,
                quantity: quantity,
                fromId: UserId
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        setQuantity(0);
        alert('Transaction Done.');
        setOpenPopup(false);
    };
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>Purchase Product</div>
            </DialogTitle>
            <DialogContent>
                <form>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            User Id:
                        </label>
                        <label>
                            {UserId && <label>{UserId}</label>}
                        </label>
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Product Id:
                        </label>
                        <label>
                            {openPopup && <label>{rowData.productId}</label>}
                        </label>
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Company Id:
                        </label>
                        {openPopup && <label>{rowData.companyId}</label>}
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Amount:
                        </label>
                        {openPopup && <label>{rowData.amount}</label>}
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
