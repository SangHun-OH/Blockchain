// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Adoption {
    address[16] public adopters;
    
    function adopt(uint pedId) payable public returns (uint) {
        require (pedId >= 0 && pedId <= 15);
        adopters[pedId] = msg.sender;
        return pedId;
    }
    
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}