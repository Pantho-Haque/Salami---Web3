// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Salami {
    struct User {
        string name;
        address userAddress;
        bool registered;
    }
    struct SalamiInfo {
        address from;
        address to;
        uint256 amount;
        string message;
        bool seen;
    }

    mapping(address => User) private users;
    mapping(address => mapping(address => SalamiInfo)) private salamiinfo;


    // Get the account Details
    function getUserDetails() public view returns (User memory) {
        return users[msg.sender];
    }


    // Register a user
    function register(string memory _name) external {
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender] = User(_name, msg.sender , true);
    }


    // Send money to another account
    function sendMoney(address payable _to, string memory message) external payable {
        // require(users[msg.sender].registered, "You need to register first");
        // require(users[_to].registered, "Recipient is not registered");

        // Transfer ETH to the recipient
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Transfer failed.");

        salamiinfo[_to][msg.sender] = SalamiInfo(msg.sender,_to, msg.value/10**18 , message,false);
    }

    //Get salami message
    function getSalamiMessage(address _to,address _from) external view returns (SalamiInfo memory){
        return salamiinfo[_to][_from];
    }

    // salami seen
    function salamiSeen(address _to,address _from) external {
        salamiinfo[_to][_from].seen = true;
    }
}

// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// contract.sendMoney(recipientAddress, { value: 1 ether });


// Deployed Addresses 

// SalamiModule#Salami - 0x5FbDB2315678afecb367f032d93F642f64180aa3
