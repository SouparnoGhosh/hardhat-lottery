/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const BASE_FEE = "250000000000000000"; // 0.25 is this the premium in LINK?
const GAS_PRICE_LINK = 1e9; // link per gas, is this the gas lane? // 0.000000001 LINK per gas

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const constructorArguments = [BASE_FEE, GAS_PRICE_LINK];

  if (chainId === 31337) {
    log("----------------------------------");
    log(`Local network detected. Deploying Mocks...`);
    log("Mocks Deployed!");
    log("----------------------------------");

    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: constructorArguments,
    });

    // Additional Info
    log("----------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
    );
    log("----------------------------------");
  }
};

export default deployMocks;
deployMocks.tags = ["all", "mock"];
