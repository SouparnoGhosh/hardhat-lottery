export interface networkConfigItem {
  name?: string;
  subscriptionId?: string;
  gasLane?: string;
  keepersUpdateInterval?: string;
  raffleEntranceFee?: string;
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
  },
};

export const developmentChains = ["hardhat", "localhost"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
