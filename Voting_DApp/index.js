web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"))

var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

contract = new web3.eth.Contract([
 {
  "inputs": [
   {
    "internalType": "bytes32[]",
    "name": "candidateNames",
    "type": "bytes32[]"
   }
  ],
  "stateMutability": "nonpayable",
  "type": "constructor"
 },
 {
  "inputs": [
   {
    "internalType": "bytes32",
    "name": "candidate",
    "type": "bytes32"
   }
  ],
  "name": "voteForCandidate",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "name": "candidateList",
  "outputs": [
   {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "bytes32",
    "name": "candidate",
    "type": "bytes32"
   }
  ],
  "name": "totalVotesFor",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "bytes32",
    "name": "candidate",
    "type": "bytes32"
   }
  ],
  "name": "validCandidate",
  "outputs": [
   {
    "internalType": "bool",
    "name": "",
    "type": "bool"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 },
 {
  "inputs": [
   {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
   }
  ],
  "name": "votesReceived",
  "outputs": [
   {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
   }
  ],
  "stateMutability": "view",
  "type": "function"
 }
]);
contract.options.address="0xF6c4931D06462aAb356A940366166cA9B2F1fAA8";

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);

 contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
  let div_id = candidates[candidateName];
  contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
   $("#" + div_id).html(f);
  })
 })
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];

 contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
  $("#" + candidates[name]).html(f);
 })
 }
});
