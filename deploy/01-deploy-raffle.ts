/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";
import { VRFCoordinatorV2Mock } from "../typechain";

const FUND_AMOUNT = "1000000000000000000000";

const deployRaffle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let vrfCoordinatorV2Address, subscriptionId;
  log(`Deploying Raffle...`);

  if (developmentChains.includes(network.name)) {
    // Create VRF V2 Subscription
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;

    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait(1);
    // @ts-ignore
    subscriptionId = transactionReceipt.events[0].args.subId;
    await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address =
      networkConfig[network.config.chainId!].vrfCoordinatorV2;
    subscriptionId = networkConfig[network.config.chainId!].subscriptionId;
  }

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("----------------------------------------------------");

  const args: any[] = [
    vrfCoordinatorV2Address,
    networkConfig[network.config.chainId!].raffleEntranceFee,
    networkConfig[network.config.chainId!].gasLane,
    subscriptionId,
    networkConfig[network.config.chainId!].callbackGasLimit,
    networkConfig[network.config.chainId!].keepersUpdateInterval,
  ];

  const raffle = await deploy("Raffle", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  // Verification
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(raffle.address, args);
  }

  // Pricefeed
  log("----------------------------------------------------");
  log("Run Price Feed contract with command:");
  const networkName = network.name === "hardhat" ? "localhost" : network.name;
  log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`);
  log("----------------------------------------------------");
};

export default deployRaffle;
deployRaffle.tags = ["all", "main", "raffle"];
