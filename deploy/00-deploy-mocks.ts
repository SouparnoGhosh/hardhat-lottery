/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
/* eslint-disable no-unused-vars */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { developmentChains } from "../helper-hardhat-config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const BASE_FEE = ethers.utils.parseEther("0.25");
  const GAS_PRICE_LINK = 1e9;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const _args = [BASE_FEE, GAS_PRICE_LINK];

  if (chainId === 31337) {
    log(`Local network detected! Deploying mocks...`);
    // Deploy a VRF Mock
    await deploy("VRFCoordinatorV2Mock.sol", {
      from: deployer,
      log: true,
      args: _args,
    });
    log("Mocks deployed");
    log(`--------------------------------------`);
  }
};

export default func;
func.tags = ["all", "mocks"];
