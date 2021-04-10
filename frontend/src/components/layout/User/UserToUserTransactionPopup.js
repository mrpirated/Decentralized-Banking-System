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
	const {
        rowData,
        openPopup,
        setOpenPopup
    } = props;
	const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios
			.post(config.userToUserTransaction, {
                toid: rowData.userId,
                amount: amount,
                fromId: UserId
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        setAmount(0);
        alert('Transaction Done.');
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
                            From User:
                        </label>
                        <label>
                            {UserId}
                        </label>
                    </div>
                    <div>
                        <label style={{marginRight: "10px", fontWeight:"Bold"}}>
                            To User:
                        </label>
                        {openPopup && <label>{rowData.userId}</label>}
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
                    <Button style={{marginRight: "25px"}} onClick={handleSubmit} className='btn btn-primary'>Make Transaction</Button>
                    <Button onClick={()=>(setOpenPopup(false))} className='btn btn-primary'>Close</Button>
                </form>

            </DialogContent>
        </Dialog>
	);
}
