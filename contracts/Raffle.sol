//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Enter players
// Select random winner
// Declare automatically after X minutes
// Chainlink Oracle - Randomness
// Chainlink Keeper - Automated Execution

contract Raffle {
    //solhint-disable var-name-mixedcase

    // errors
    error Raffle__NotEnoughETHEntered();

    // variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
    }

    // function pickRandomWinner () {}

    // getter functions
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
