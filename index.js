// 
  
  if (typeof web3 !== 'undefined'){
	  web3 = new Web3(web3.currentProvider);
	  console.log("web3 is not undefined");
	  ethereum.enable()
  }
  else{
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
	console.log("web3 is undefined");
  }
  
  web3.eth.defaultAccount = web3.eth.accounts[0];
  
	var abi = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createAccount",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "verifyBal",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			}
		],
		"name": "alert",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "accountAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LogDepositMade",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "balances",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
  
  var SimpleBank = abi.at('0xA30786F5202C413A31F0aa89761DeCD7292b6746');
  console.log(SimpleBank);
  
  function error(message) {
	  console.log(message);
  }
  
  function waitForReceipt(hash, cb) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      error(err);
    }
    if (receipt !== null) {
      // Transaction went through
      if (cb) {
        cb(receipt);
      }
    } else {
      // Try again in 1 second
      window.setTimeout(function () {
        waitForReceipt(hash, cb);
      }, 1000);
    }
  });
}
  
  
  //create new account
  $('#createAccount').click(function (e) {
    e.preventDefault();
    if (web3.eth.defaultAccount === undefined) {
      return error("No accounts found. If you're using MetaMask, " +
        "please unlock it first and reload the page.");
    }
    console.log("Transaction On its Way...");
    SimpleBank.createAccount.sendTransaction(document.getElementById("name").value, 
	{gas: 300000, from: web3.eth.defaultAccount, value: window.web3.toWei(document.getElementById("createAmount").value, 'ether')}, function (err, hash) {
      if (err) {
		alert("15 ether initial funding required");
        return error(err);
      }
      waitForReceipt(hash, function () {
		verifyBal("Account balance is more than 50 ether");
        console.log("Transaction succeeded.");
      });
    });
  });

  //get account details
  $('#getAccountDetails').click(function (e) {
    e.preventDefault();
    SimpleBank.getName.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getName').text(result.toString());
    });
  });
  
   $('#getAccountDetails').click(function (e) {
    e.preventDefault();
    SimpleBank.getAddress.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getAddress').text(result.toString());
    });
  });
  
   $('#getAccountDetails').click(function (e) {
    e.preventDefault();
    SimpleBank.getBalance.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getBalance').text(result.toString());
    });
  });
  
  
  //deposit
  $('#deposit').click(function (e) {
    e.preventDefault();
    if (web3.eth.defaultAccount === undefined) {
      return error("No accounts found. If you're using MetaMask, " +
        "please unlock it first and reload the page.");
    }
    console.log("Transaction On Its Way...");
	SimpleBank.deposit.sendTransaction({gas: 300000, from: web3.eth.defaultAccount, value: window.web3.toWei(document.getElementById("depositAmount").value, 'ether')}, function (err, hash) {
      if (err) {
		getViolation("Cannot deposit more than 20 ether");
        return error(err);
      }
      console.log("Depositing Balance Into Your Account...")
      waitForReceipt(hash, function () {
		verifyBal("Account balance is more than 50 ether");
        console.log("Transaction succeeded.");
      });
    });
  });
  
  
  //withdraw
  $('#withdraw').click(function (e) {
    e.preventDefault();
    if (web3.eth.defaultAccount === undefined) {
      return error("No accounts found. If you're using MetaMask, " +
        "please unlock it first and reload the page.");
    }
    console.log("Transaction On its Way...");
	
	SimpleBank.withdraw.sendTransaction({gas: 300000, from: web3.eth.defaultAccount, value: window.web3.toWei(document.getElementById("withdrawAmount").value, 'ether')}, function (err, hash) {
      if (err) {
		getViolation("Cannot withdraw more than 20 ether");
        return error(err);
      }
      waitForReceipt(hash, function () {
		verifyBal("Account balance is more than 50 ether");
        console.log("Transaction succeeded.");
      });
    });
  });

	function verifyBal(message){
		SimpleBank.verifyBal.call(function(err, result){
			if (err) {
				getViolation(message);
				return error(err);
			}
			console.log("not exceed 50");
		});
	}
  

  
  
  //getViolation
 function getViolation (message){
   
	console.log(message);
	alert(message + ". Check violation message below for details");
    $('#getViolation').text(message);
	
	SimpleBank.getName.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getNameViolate').text(result.toString());
    });
	
	SimpleBank.getBalance.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getBalanceViolate').text(result.toString());
    });
	
	SimpleBank.getAddress.call(function (err, result) {
      if (err) {
        return error(err);
      }
      $('#getAddressViolate').text(result.toString());
    });
 }
  