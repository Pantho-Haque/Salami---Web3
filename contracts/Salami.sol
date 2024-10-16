// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Salami {
    struct User {
        string name;
        string tag ;
        address userAddress;
        bool registered;
    }
    
    struct SalamiInfo {
        address from;
        address to;
        uint256 amount;
        string message;
        bool seen;
        uint256 time;
    }

    mapping(address => User) private users; 
    address[] private userAddresses;
    mapping(address => mapping(address => SalamiInfo)) private salamiinfo;
    mapping(address => address[]) private senders;


    // Get the account Details
    function getUserDetails() public view returns (User memory) {
        return users[msg.sender];
    }

    // Get all users
    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length); // Create an array to store users

        for (uint i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]]; // Fetch each user from the mapping
        }

        return allUsers;
    }

    // Register a user
    function register(string memory name,string memory tag) external {
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender] = User(name, tag , msg.sender , true);
        userAddresses.push(msg.sender);
    }


    // Send money to another account
    function sendMoney(address payable _to, string memory message) external payable {
        require(users[msg.sender].registered, "You need to register first");
        require(users[_to].registered, "Recipient is not registered");

        // Transfer ETH to the recipient
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Transfer failed.");

        salamiinfo[_to][msg.sender] = SalamiInfo(msg.sender,_to, msg.value/10**18 , message,false, block.timestamp);
        senders[_to].push(msg.sender);
    }

    //Get salami message
    function getAllSalamiForTo(address _to) external view returns (SalamiInfo[] memory) {
        uint256 count = senders[_to].length;
        SalamiInfo[] memory salamiList = new SalamiInfo[](count);

        for (uint256 i = 0; i < count; i++) {
            address sender = senders[_to][i];
            salamiList[i] = salamiinfo[_to][sender];
        }

        return salamiList;
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
