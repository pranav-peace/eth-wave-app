//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract WavePortal {
    uint256 totalWaves;
    
    // Variable we will use to generate seed
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);
    
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    // Map variabe to know who send the last time user sent a message
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Yes, I'm a smart contract, didn't you know?");

        // Set Initial Seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        // Make sure that current timestamp is at least 15 min bigger than the last timestamp we stored
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15 minutes to send another message!   "
        );

        //Update current timestamp we have for the user
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Update the seed for the next user
        seed = (block.timestamp + block.difficulty + seed) % 100;
        console.log("Random No. generated: %d", seed);

        if(seed<=50){
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Falied to withdraw money from the contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}