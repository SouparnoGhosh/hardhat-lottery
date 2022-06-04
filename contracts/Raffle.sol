//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Enter players
// Select random winner
// Declare automatically after X minutes
// Chainlink Oracle - Randomness
// Chainlink Keeper - Automated Execution

// import contracts and interfaces
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract Raffle {
    //solhint-disable var-name-mixedcase

    // errors
    error Raffle__NotEnoughETHEntered();

    // variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    // Events
    event RaffleEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        // emit player entering
        emit RaffleEnter(msg.sender);
    }

    // function requestRandomWinner () external {}

    // function fulfillRandomWords() internal override {}

    // getter functions
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
