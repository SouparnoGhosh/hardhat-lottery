/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy } = deployments;
  const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2");

  const { deployer } = await getNamedAccounts();
  let vrfCoordinatorV2Address, subscriptionId;
  const chainId = network.config.chainId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait(1);
    subscriptionId = transactionReceipt.events[0].args.subId;
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      VRF_SUB_FUND_AMOUNT
    );
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId!].vrfCoordinatorV2;
  }

  const _args = [];
  await deploy("Raffle", {
    // <-- name of the deployment
    contract: "Raffle", // <-- name of the contract/artifact(more specifically) to deploy
    from: deployer, // <-- account to deploy from
    args: [], // <-- contract constructor arguments. Here it has nothing
    log: true, // <-- log the address and gas used in the console
    waitConfirmations: 6,
  });
};

export default func;
func.tags = ["raffle", "all"];
