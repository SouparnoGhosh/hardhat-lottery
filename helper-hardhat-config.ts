/* eslint-disable node/no-unpublished-import */
import { ethers } from "hardhat";
import "";

export interface networkConfigItem {
  name?: string;
  subscriptionId?: string;
  gasLane?: string;
  keepersUpdateInterval?: string;
  entranceFee?: any;
  callbackGasLimit?: string;
  vrfCoordinatorV2?: string;
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  4: {
    name: "rinkeby",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    entranceFee: ethers.utils.parseEther("0.01"),
    subscriptionId: "0",
  },
  31337: {
    name: "localhost",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
  },
};

export const developmentChains = ["hardhat", "localhost"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
