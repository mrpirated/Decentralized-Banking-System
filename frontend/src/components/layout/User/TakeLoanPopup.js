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
    const [amount, setAmount] = useState(0);
    const [month, setMonth] = useState(0);
	const {
        rowData,
        openPopup,
        setOpenPopup
    } = props;
	const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios
			.post(config.takeloan, {
                fromId: UserId,
                lenderid: rowData.lenderid,
                amount: amount,
                month: month
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        setMonth(0);
        setAmount(0);
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
                            Lender Id:
                        </label>
                        <label>
                            {openPopup && <label>{rowData.lenderid}</label>}
                        </label>
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            IPM:
                        </label>
                        {openPopup && <label>{rowData.ipm}</label>}
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            IIPM:
                        </label>
                        {openPopup && <label>{rowData.iipm}</label>}
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Amount:
                        </label>
                        <input
                            type='text'
                            value={amount}
                            style={{ marginRight: "90px" }}
                            onChange={(event) => (setAmount(event.target.value))}
                        />
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            Month:
                        </label>
                        <input
                            type='text'
                            value={month}
                            style={{ marginRight: "90px" }}
                            onChange={(event) => (setMonth(event.target.value))}
                        />
                    </div>
                    <Button style={{marginRight: "25px"}} onClick={handleSubmit} className='btn btn-primary'>Make Transaction</Button>
                    <Button onClick={()=>(setOpenPopup(false))} className='btn btn-primary'>Close</Button>
                </form>
            </DialogContent>
        </Dialog>
	);
}
