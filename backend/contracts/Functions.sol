pragma solidity 0.5.16;
//pragma experimental ABIEncoderV2;
import "./Global.sol";

contract Functions is Global {
    // function get()public view returns (string [] memory, string [] memory,bytes32 [] memory){
    //     return (decentralizedBank.users,decentralizedBank.companies,decentralizedBank.transactions);
    // }

    function payTaxes() external {
        for (uint256 i = 0; i < decentralizedBank.users.length; i++) {
            if (users[decentralizedBank.users[i]].isUser) {
                transaction_count++;
                int256 amount = 0;
                if (users[decentralizedBank.users[i]].income > 250000) {
                    if (users[decentralizedBank.users[i]].income > 500000) {
                        amount += (250000 * 5) / 100;
                        if (
                            users[decentralizedBank.users[i]].income > 1000000
                        ) {
                            amount += (500000 * 10) / 100;
                            amount +=
                                ((users[decentralizedBank.users[i]].income -
                                    1000000) * 30) /
                                100;
                        } else {
                            amount +=
                                ((users[decentralizedBank.users[i]].income -
                                    500000) * 10) /
                                100;
                        }
                    } else {
                        amount +=
                            ((users[decentralizedBank.users[i]].income -
                                250000) * 5) /
                            100;
                    }
                }
                bytes32 tid =
                    stringToBytes32(
                        string(
                            abi.encodePacked(
                                "tax",
                                uint2str(transaction_count),
                                "_0"
                            )
                        )
                    );
                Transaction memory newtransaction =
                    Transaction(
                        tid,
                        true,
                        decentralizedBank.users[i],
                        "decentralizedBankid",
                        amount,
                        false,
                        ""
                    );
                if (
                    users[decentralizedBank.users[i]].inhand >=
                    amount +
                        ((users[decentralizedBank.users[i]].tax_due) * 4) /
                        100
                ) {
                    newtransaction.success = true;
                    newtransaction.summary = "Tax Payment Sucessful for User";
                    government.transactions.push(tid);
                    decentralizedBank.transactions.push(tid);
                    users[decentralizedBank.users[i]].transactions.push(tid);
                    government.inhand +=
                        amount +
                        ((users[decentralizedBank.users[i]].tax_due) * 4) /
                        100;
                    government.net_worth +=
                        amount +
                        ((users[decentralizedBank.users[i]].tax_due) * 4) /
                        100;
                    users[decentralizedBank.users[i]].inhand -=
                        amount +
                        ((users[decentralizedBank.users[i]].tax_due) * 4) /
                        100;
                    users[decentralizedBank.users[i]].net_worth -=
                        amount +
                        ((users[decentralizedBank.users[i]].tax_due) * 4) /
                        100;
                    users[decentralizedBank.users[i]].tax_due = 0;
                    users[decentralizedBank.users[i]].income = 0;
                } else {
                    newtransaction.summary = "Insufficient balance";
                    government.transactions.push(tid);
                    government.net_worth += amount;
                    decentralizedBank.transactions.push(tid);
                    users[decentralizedBank.users[i]].transactions.push(tid);
                    users[decentralizedBank.users[i]].net_worth -= amount;
                    users[decentralizedBank.users[i]].tax_due += amount;
                    users[decentralizedBank.users[i]].income = 0;
                }
                transactions[tid] = newtransaction;
            }
        }

        for (uint256 i = 0; i < decentralizedBank.companies.length; i++) {
            if (companies[decentralizedBank.companies[i]].isCompany) {
                transaction_count++;
                int256 amount = 0;
                if (companies[decentralizedBank.companies[i]].income > 250000) {
                    if (
                        companies[decentralizedBank.companies[i]].income >
                        500000
                    ) {
                        amount += (250000 * 5) / 100;
                        if (
                            companies[decentralizedBank.companies[i]].income >
                            1000000
                        ) {
                            amount += (500000 * 10) / 100;
                            amount +=
                                ((companies[decentralizedBank.companies[i]]
                                    .income - 1000000) * 30) /
                                100;
                        } else {
                            amount +=
                                ((companies[decentralizedBank.companies[i]]
                                    .income - 500000) * 10) /
                                100;
                        }
                    } else {
                        amount +=
                            ((companies[decentralizedBank.companies[i]].income -
                                250000) * 5) /
                            100;
                    }
                }
                //amount+=companies[decentralizedBank.companies[i]].income*20/100;
                bytes32 tid =
                    stringToBytes32(
                        string(
                            abi.encodePacked(
                                "tax",
                                uint2str(transaction_count),
                                "_1"
                            )
                        )
                    );
                Transaction memory newtransaction =
                    Transaction(
                        tid,
                        true,
                        decentralizedBank.companies[i],
                        "decentralizedBankid",
                        amount,
                        false,
                        ""
                    );
                if (
                    companies[decentralizedBank.companies[i]].inhand >=
                    amount +
                        ((companies[decentralizedBank.companies[i]].tax_due) *
                            5) /
                        100
                ) {
                    newtransaction.success = true;
                    newtransaction.summary = "Tax Payment Sucessfull";
                    decentralizedBank.transactions.push(tid);
                    government.transactions.push(tid);
                    government.inhand +=
                        amount +
                        ((companies[decentralizedBank.companies[i]].tax_due) *
                            5) /
                        100;
                    government.net_worth +=
                        amount +
                        ((companies[decentralizedBank.companies[i]].tax_due) *
                            5) /
                        100;
                    companies[decentralizedBank.companies[i]].transactions.push(
                        tid
                    );
                    companies[decentralizedBank.companies[i]].inhand -=
                        amount +
                        ((companies[decentralizedBank.companies[i]].tax_due) *
                            5) /
                        100;
                    companies[decentralizedBank.companies[i]].net_worth -=
                        amount +
                        ((companies[decentralizedBank.companies[i]].tax_due) *
                            5) /
                        100;
                    companies[decentralizedBank.companies[i]].tax_due = 0;
                    companies[decentralizedBank.companies[i]].income = 0;
                } else {
                    newtransaction.summary = "Insufficient balance";
                    government.transactions.push(tid);
                    government.net_worth += amount;
                    decentralizedBank.transactions.push(tid);
                    companies[decentralizedBank.companies[i]].transactions.push(
                        tid
                    );
                    companies[decentralizedBank.companies[i]]
                        .net_worth -= amount;
                    companies[decentralizedBank.companies[i]].tax_due += amount;
                    companies[decentralizedBank.companies[i]].income = 0;
                }
                transactions[tid] = newtransaction;
            }
        }
    }
