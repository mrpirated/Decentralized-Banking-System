pragma solidity 0.5.16;
//pragma experimental ABIEncoderV2;
import "./Global.sol";

contract Functions is Global{
    // function get()public view returns (string [] memory, string [] memory,bytes32 [] memory){
    //     return (decentralizedBank.users,decentralizedBank.companies,decentralizedBank.transactions);
    // }
    
    
    //event successfull(bool);
    function payTaxes()external{
        for(uint i=0;i<decentralizedBank.users.length;i++){
            if(users[decentralizedBank.users[i]].isUser){
            
            int256 amount=0;
            if(users[decentralizedBank.users[i]].income>250000){
                if(users[decentralizedBank.users[i]].income>500000){
                    amount+=250000*5/100;
                    if(users[decentralizedBank.users[i]].income>1000000){
                        amount+=500000*10/100;
                        amount+=(users[decentralizedBank.users[i]].income-1000000)*30/100;
                    }else{
                        amount+=(users[decentralizedBank.users[i]].income-500000)*10/100;
                    }
                }else{
                    amount+=(users[decentralizedBank.users[i]].income-250000)*5/100;
                }
            }
            if(amount!=0){
            transaction_count++;
            bytes32  tid = stringToBytes32(string(abi.encodePacked("tax",uint2str(transaction_count),"_0")));
            Transaction memory newtransaction=Transaction(tid,true,decentralizedBank.users[i],"decentralizedBankid",amount,false,"");
            if(users[decentralizedBank.users[i]].inhand>=amount+(users[decentralizedBank.users[i]].tax_due)*4/100){
                newtransaction.success=true;
                newtransaction.summary="Tax Payment Sucessful for User";
                government.transactions.push(tid);
                decentralizedBank.transactions.push(tid);
                users[decentralizedBank.users[i]].transactions.push(tid);
                government.inhand+=amount+(users[decentralizedBank.users[i]].tax_due)*4/100;
                government.net_worth+=amount+(users[decentralizedBank.users[i]].tax_due)*4/100;
                users[decentralizedBank.users[i]].inhand-=amount+(users[decentralizedBank.users[i]].tax_due)*4/100;
                users[decentralizedBank.users[i]].net_worth-=amount+(users[decentralizedBank.users[i]].tax_due)*4/100;
                users[decentralizedBank.users[i]].tax_due=0;
                users[decentralizedBank.users[i]].income=0;
            }else{
                newtransaction.summary="Insufficient balance";
                government.transactions.push(tid);
                government.net_worth+=amount;
                decentralizedBank.transactions.push(tid);
                users[decentralizedBank.users[i]].transactions.push(tid);
                users[decentralizedBank.users[i]].net_worth-=amount;
                users[decentralizedBank.users[i]].tax_due+=amount;
                users[decentralizedBank.users[i]].income=0;
            }
            transactions[tid]=newtransaction;
            }
            }
        }
        
        for(uint i=0;i<decentralizedBank.companies.length;i++){
            if(companies[decentralizedBank.companies[i]].isCompany){
            //transaction_count++;
            int256 amount=0;
            amount+=(companies[decentralizedBank.companies[i]].income)*30/100;
            if(amount!=0){
            transaction_count++;
            //amount+=companies[decentralizedBank.companies[i]].income*20/100;
            bytes32 tid = stringToBytes32(string(abi.encodePacked("tax",uint2str(transaction_count),"_1")));
            Transaction memory newtransaction=Transaction(tid,true,decentralizedBank.companies[i],"decentralizedBankid",amount,false,"");
            if(companies[decentralizedBank.companies[i]].inhand>=amount+(companies[decentralizedBank.companies[i]].tax_due)*5/100){
                newtransaction.success=true;
                newtransaction.summary="Tax Payment Sucessfull";
                decentralizedBank.transactions.push(tid);
                government.transactions.push(tid);
                government.inhand+=amount+(companies[decentralizedBank.companies[i]].tax_due)*5/100;
                government.net_worth+=amount+(companies[decentralizedBank.companies[i]].tax_due)*5/100;
                companies[decentralizedBank.companies[i]].transactions.push(tid);
                companies[decentralizedBank.companies[i]].inhand-=amount+(companies[decentralizedBank.companies[i]].tax_due)*5/100;
                companies[decentralizedBank.companies[i]].net_worth-=amount+(companies[decentralizedBank.companies[i]].tax_due)*5/100;
                companies[decentralizedBank.companies[i]].tax_due=0;
                companies[decentralizedBank.companies[i]].income=0;
            }else{
                newtransaction.summary="Insufficient balance";
                 government.transactions.push(tid);
                 government.net_worth+=amount;
                 decentralizedBank.transactions.push(tid);
                 companies[decentralizedBank.companies[i]].transactions.push(tid);
                 companies[decentralizedBank.companies[i]].net_worth-=amount;
                 companies[decentralizedBank.companies[i]].tax_due+=amount;
                 companies[decentralizedBank.companies[i]].income=0;
            }
            transactions[tid]=newtransaction;
            }
            }
        }
        
    }
    function remove(uint index,bytes32 id) internal  {
        if (index >= lenders[id].clients.length) return;
    
        lenders[id].clients[index] = lenders[id].clients[lenders[id].clients.length-1];
            lenders[id].amount[index]=lenders[id].amount[lenders[id].months.length-1];
            lenders[id].months[index]=lenders[id].months[lenders[id].amount.length-1];
        lenders[id].clients.pop();
        lenders[id].months.pop();
        lenders[id].amount.pop();
    }
    function monthly()external{
        
        for(uint i=0;i<decentralizedBank.users.length;i++){
            if(users[decentralizedBank.users[i]].isUser){
            bytes32 id = decentralizedBank.users[i];
            if(lenders[id].islender){
               for(uint j=0;j<lenders[id].clients.length;j++){
                   lenders[id].months[j]--;
                   if(lenders[id].months[j]==0){
                       if(users[lenders[id].clients[j]].inhand>=lenders[id].amount[j]){
                           transaction_count++;
                           bytes32 tid = stringToBytes32(string(abi.encodePacked("loan",uint2str(transaction_count),"_1")));
                           users[lenders[id].clients[j]].inhand-=lenders[id].amount[j];
                           users[lenders[id].clients[j]].income-=lenders[id].amount[j];
                           users[id].inhand+=lenders[id].amount[j];
                           users[id].income+=lenders[id].amount[j];
                           users[lenders[id].clients[j]].transactions.push(tid);
                           users[id].transactions.push(tid);
                           decentralizedBank.transactions.push(tid);
                           remove(j,id);
                           j--;
                       }
                   }else if(lenders[id].months[j]<0){
                       users[id].net_worth+=lenders[id].amount[j]*(lenders[id].ipm+lenders[id].iipm*-1)/100;
                       users[lenders[id].clients[j]].net_worth-=lenders[id].amount[j]*(lenders[id].ipm+lenders[id].iipm*-1)/100;
                       lenders[id].amount[j]+=lenders[id].amount[j]*(lenders[id].ipm+lenders[id].iipm*-1)/100;
                   }
               } 
            }
            }
        }
        
        for(uint i=0;i<decentralizedBank.companies.length;i++){
            if(companies[decentralizedBank.companies[i]].isCompany){
            int256 amount=companies[decentralizedBank.companies[i]].salary;
            for(uint j=0;j<companies[decentralizedBank.companies[i]].employees.length;j++){
                transaction_count++;
                bytes32 tid = stringToBytes32(string(abi.encodePacked("salary",uint2str(transaction_count),"_0")));
                Transaction memory newtransaction=Transaction(tid,true,decentralizedBank.companies[i],companies[decentralizedBank.companies[i]].employees[j],amount,false,"");
                if(companies[decentralizedBank.companies[i]].inhand>=amount+companies[decentralizedBank.companies[i]].remaining_salary[j]){
                    newtransaction.success=true;
                    newtransaction.summary="Salary Credited Successfully";
                    decentralizedBank.transactions.push(tid);
                    companies[decentralizedBank.companies[i]].transactions.push(tid);
                    users[companies[decentralizedBank.companies[i]].employees[j]].transactions.push(tid);
                    companies[decentralizedBank.companies[i]].inhand-=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    companies[decentralizedBank.companies[i]].income-=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    //companies[decentralizedBank.companies[i]].net_worth-=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    users[companies[decentralizedBank.companies[i]].employees[j]].net_worth+=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                     users[companies[decentralizedBank.companies[i]].employees[j]].income+=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    users[companies[decentralizedBank.companies[i]].employees[j]].inhand+=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    companies[decentralizedBank.companies[i]].remaining_salary[j]=0;
                    
                }else{
                    newtransaction.summary="Unable to Credit Salary";
                    decentralizedBank.transactions.push(tid);
                    companies[decentralizedBank.companies[i]].transactions.push(tid);
                    users[companies[decentralizedBank.companies[i]].employees[j]].transactions.push(tid);
                    users[companies[decentralizedBank.companies[i]].employees[j]].net_worth+=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                    companies[decentralizedBank.companies[i]].remaining_salary[j]+=amount+companies[decentralizedBank.companies[i]].remaining_salary[j];
                }
                transactions[tid]=newtransaction;
            }
            }
        }
        
    }
    
    //event Purchase(bytes32,bytes32);
    function productPurchase(bytes32 fromid,bytes32 productId, int256 quantity) external{
        if(companies[products[productId].company].isCompany&&users[fromid].isUser&&products[productId].isProduct){
        transaction_count++;
        bytes32 tid = stringToBytes32(string(abi.encodePacked("product_purchase",uint2str(transaction_count),"_0")));
        //Product memory tempProduct = products[productId];
        //require((products[productId].selling_price)*quantity <= users[fromid].inhand, "Insufficient Balance.");
        int256 amount = products[productId].selling_price*quantity;
        Transaction memory newtransaction = Transaction(tid,true,fromid,products[productId].company,amount,false,"");
        if(products[productId].selling_price*quantity <= users[fromid].inhand){
            newtransaction.success=true;
            newtransaction.summary="Transaction carried Successfully";
        
        companies[products[productId].company].net_worth += (products[productId].selling_price)*quantity;
        companies[products[productId].company].income += (products[productId].selling_price - products[productId].cost_price)*quantity;
        decentralizedBank.transactions.push(tid);
        companies[products[productId].company].inhand += (products[productId].selling_price)*quantity;
        companies[products[productId].company].transactions.push(tid);
        users[fromid].net_worth -= (products[productId].selling_price - products[productId].cost_price)*quantity;
        users[fromid].inhand -= (products[productId].selling_price)*quantity;
        products[productId].quantity-=quantity;
        users[fromid].transactions.push(tid);
        
        }else{
            newtransaction.summary="Insufficient Balance";
             companies[products[productId].company].transactions.push(tid);
             decentralizedBank.transactions.push(tid);
              users[fromid].transactions.push(tid);
        }
        transactions[tid] = newtransaction;
        }
        //emit Purchase(fromid,productId);
    }
    //event Lend(bytes32);
    function becomeLender(bytes32 id,int256 ipm,int256 iipm)external{
        if(users[id].isUser&&users[id].inhand>=1000000){
            lenders[id]=Lender({
                id:id,
                islender:true,
                clients:new bytes32[](0),
                ipm:ipm,
                iipm:iipm,
                months:new int256[](0),
                amount:new int256[](0)
            });
            //emit Lend(id);
        }
    }
    //event Loan(bytes32,bytes32);
    function takeloan(bytes32 fromid,bytes32 lenderid,int256 amount,int256 month)external{
        if(users[fromid].isUser&&lenders[lenderid].islender){
        transaction_count++;
        bytes32 tid = stringToBytes32(string(abi.encodePacked("loan",uint2str(transaction_count),"_0")));
        Transaction memory newtransaction = Transaction(tid,true,lenderid,fromid,amount,false,"");
        newtransaction.success=true;
        users[lenderid].transactions.push(tid);
        users[fromid].transactions.push(tid);
        decentralizedBank.transactions.push(tid);
        users[lenderid].inhand-=amount;
        users[fromid].inhand+=amount;
        users[lenderid].net_worth+=amount*lenders[lenderid].ipm/100*month;
        users[fromid].net_worth-=amount*lenders[lenderid].ipm/100*month;
        lenders[lenderid].clients.push(fromid);
        lenders[lenderid].months.push(month);
        lenders[lenderid].amount.push(amount+amount*lenders[lenderid].ipm/100*month);
        transactions[tid]=newtransaction;
        }
        //emit Loan(fromid,lenderid);
    }
    
    function createProduct(bytes32 companyId, int256 cost_price, int256 selling_price,int256 quantity)external{
        if(companies[companyId].isCompany&&cost_price*quantity<=companies[companyId].inhand){
        products_count+=1;
        bytes32 productId = stringToBytes32(string(abi.encodePacked("product_",uint2str(products_count))));
        Product memory newProduct = Product(productId,true, companyId, cost_price, selling_price,quantity);
        products[productId] = newProduct;
        companies[companyId].products.push(productId);
        companies[companyId].inhand-=cost_price*quantity;
        companies[companyId].net_worth-=cost_price*quantity;
        //companies[companyId].income-=cost_price*quantity;
        decentralizedBank.products.push(productId);
        //emit successfull(true);
        }
        else{
        //emit successfull(false);
        }
        
    }
    function changeProductDetails(bytes32 productId, int256 cost_price, int256 selling_price, int256 quantity) external{
        if(products[productId].isProduct){
            if(cost_price > 0){
                products[productId].cost_price = cost_price;
            }
            
            if(selling_price > 0){
                products[productId].selling_price = selling_price;
            }

            if(quantity > 0){
                products[productId].quantity = quantity;
            }
            //emit successfull(true);
        }else{
       // emit successfull(false);
        }
    }
    
    function createVacancy(bytes32 companyId,int256 vacancy,int256 salary)external{
        if(companies[companyId].isCompany){
        companies[companyId].vacancy=vacancy;
        companies[companyId].salary=salary;
        //emit successfull(true);
        }
    }
   
    function recruitEmployee(bytes32 companyId, bytes32 userId) external{
        if(companies[companyId].isCompany&&companies[companyId].vacancy>0){
        companies[companyId].employees.push(userId);
        companies[companyId].remaining_salary.push(0);
        companies[companyId].vacancy -= 1;
        users[userId].companies.push(companyId);
        //emit successfull(true);
        }
    }
    //event usertouser(bytes32,bytes32);
    function userToUserTransaction(bytes32 fromid, bytes32 toid, int256 amount) external{
        if(users[fromid].isUser&&users[toid].isUser){
        transaction_count++;
        // string memory description = "u2u";
        // string memory transaction_type = "_2";
        bytes32 tid = stringToBytes32(string(abi.encodePacked("u2u",uint2str(transaction_count),"_2")));
        Transaction memory newtransaction = Transaction(tid,true,fromid,toid,amount,false,"Insufficient balance");
        if(users[fromid].inhand >= amount){
            users[toid].net_worth += amount;
            users[toid].inhand += amount;
            users[fromid].net_worth -= amount;
            users[fromid].inhand -= amount;
            newtransaction.success = true;
            newtransaction.summary="Transaction Successfull";
        }
        users[toid].transactions.push(tid);
        users[fromid].transactions.push(tid);
        decentralizedBank.transactions.push(tid);
        transactions[tid] = newtransaction;
        }
        //emit usertouser(fromid,toid);
    }
    
}
