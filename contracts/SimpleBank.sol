pragma solidity ^0.5.8;

contract SimpleBank {
    uint8 private clientCount;
    struct user{
        string name;
        uint balances;
    }
    mapping(address => user) public users; // contains a user for every addres
    
    address public owner;
    event alert(string);

  // Log the event about a deposit being made by an address and its amount
    event LogDepositMade(address indexed accountAddress, uint amount);
    
    //fill the account with ether, not less than 15 ether
    constructor() public payable {
        // Set the owner to the creator of this contract
        owner = msg.sender;
        clientCount = 0;
    }
    
    function createAccount(string memory _name) public payable{
        uint amount = msg.value;
        require(amount >= 15000000000000000000, "15 ether initial funding required");
        owner = msg.sender;
        users[owner].name = _name;
        users[owner].balances = amount;
        clientCount++;
    }
    
    //add ether to account
   function deposit() public payable {
       uint deposit_amount = msg.value;
		require(deposit_amount <= 20000000000000000000, "Cannot deposit more than 20 ether");
        owner = msg.sender;
       users[owner].balances += deposit_amount;
        emit LogDepositMade(owner, deposit_amount);
    }
   
    ///remove ether from contract
    function withdraw() public payable {
        uint withdraw_amount = msg.value;
        // Limit withdrawal amount = 20 ether
        require(withdraw_amount <= 20000000000000000000, "Cannot withdraw more than 20 ether");
        owner = msg.sender;
        users[owner].balances -= withdraw_amount;
       
        // Send the amount to the address that requested it
        msg.sender.transfer(withdraw_amount);
    }
    
    //check if balance is more than 50 ether
    function verifyBal() public payable {
        require(users[msg.sender].balances < 50000000000000000000, "Account balance is more than 50 ether");
    }
    
    //check balance of the account
    function getBalance() public view returns (uint) {
        return users[owner].balances;
    }
    
    function getName() public view returns (string memory) {
        return users[owner].name;
    }
    
    function getAddress() public view returns (address) {
        return msg.sender;
    }
}