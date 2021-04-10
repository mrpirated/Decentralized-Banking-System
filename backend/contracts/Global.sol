pragma solidity 0.5.16;
//pragma experimental ABIEncoderV2;
contract Global{
     struct DecentralizedBank{
        bytes32 id;
        bytes32[] transactions;
        int256 inhand;
        bytes32[] companies;
        bytes32[] users;
        bytes32[] products;
    }
    DecentralizedBank public decentralizedBank;
    struct Government{
        bytes32 id;
        int256 inhand;
        int256 net_worth;
        bytes32[] transactions;
    }
    Government public government;
    struct User{
        bytes32 id;
        bool isUser;
        int256 net_worth;
        bytes32[] transactions;
        int256 inhand;
        int256 income;
        bytes32[] companies;
        int256 tax_due;
    }
    uint256 user_count=0;
    
    struct Transaction{
        
        bytes32 id;
        bool istr;
        bytes32 fromid;
        bytes32 toid;
        int256 amount;
        bool success;
        bytes32 summary;
    }
    uint256 transaction_count=0;
    struct Company{
        bytes32 id;
        bool isCompany;
        int256 net_worth;
        int256 inhand;
        int256 income;
        bytes32[] transactions;
        bytes32[] employees;
        bytes32[] products;
        int256[] remaining_salary;
        int256 tax_due;
        int256 salary;
        int256 vacancy;
    }
    struct Product{
         bytes32 id;
         bool isProduct;
         bytes32 company;
         int256 cost_price;
         int256 selling_price;
         int256 quantity;
    }
    uint256 products_count=0;
    struct Lender{
        bytes32 id;
        bool islender;
        bytes32[] clients;
        int256 ipm;
        int256 iipm;
        int256[] months;
        int256[] amount;
    }
    uint256 company_count=0;
    mapping(bytes32=>User) public users;
    mapping(bytes32 =>Transaction) public transactions;
    mapping(bytes32=>Company) public companies;
    mapping(bytes32=>Product) public products;
    mapping(bytes32=>Lender) public lenders;
    constructor()public{
        decentralizedBank=DecentralizedBank({
            id:"decentralizedBankid",
            inhand:0,
            transactions:new bytes32[](0),
            users:new bytes32[](0),
            companies:new bytes32[](0),
            products:new bytes32[](0)
        });
        government=Government({
            id:"government",
            net_worth:0,
            inhand:0,
            transactions:new bytes32[](0)
        });
    }
    function getUserValues(bytes32 id)public view returns (bytes32 [] memory,bytes32 [] memory){
        return (users[id].transactions,users[id].companies);
    }
    function getCompanyValues(bytes32 id)public view returns (bytes32 [] memory,bytes32 [] memory,bytes32 [] memory,int256 [] memory){
        return (companies[id].transactions,companies[id].employees,companies[id].products,companies[id].remaining_salary);
    }
    function getBankValues()public view returns (bytes32 [] memory, bytes32 [] memory,bytes32 [] memory,bytes32 [] memory){
        return (decentralizedBank.users,decentralizedBank.companies,decentralizedBank.transactions,decentralizedBank.products);
    }
    function getGovtValues()public view returns(bytes32 [] memory){
        return government.transactions;
    }
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (_i != 0) {
        bstr[k--] = byte(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
}
function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}
event GetId(bytes32 id);
    function newUser() external {
        user_count++;
        bytes32 uid=stringToBytes32(string(abi.encodePacked("user_",uint2str(user_count))));
       User memory newuser=User({
            id:uid,
            isUser:true,
            net_worth:5000000,
            inhand:5000000,
            transactions:new bytes32[](0),
            companies:new bytes32[](0),
            income:5000000,
            tax_due:0
        });
        
        decentralizedBank.users.push(uid);
        users[uid]=newuser;
        emit GetId(uid);
    }
    
    
    function newCompany()external{
        company_count++;
        bytes32 cid=stringToBytes32(string(abi.encodePacked("company_",uint2str(company_count))));
        Company memory newcompany=Company({
            id:cid,
            isCompany:true,
            net_worth:50000000,
            inhand:50000000,
            income:50000000,
            transactions:new bytes32[](0),
            employees:new bytes32[](0),
            products:new bytes32[](0),
            remaining_salary:new int256[](0),
            tax_due:0,
            salary:0,
            vacancy:0
        });
        decentralizedBank.companies.push(cid);
        companies[cid]=newcompany;
        emit GetId(cid);
    }
    
}