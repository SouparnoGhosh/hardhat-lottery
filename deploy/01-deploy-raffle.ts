/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("EtherWallet", {
    // <-- name of the deployment
    contract: "EtherWallet", // <-- name of the contract/artifact(more specifically) to deploy
    from: deployer, // <-- account to deploy from
    args: [], // <-- contract constructor arguments. Here it has nothing
    log: true, // <-- log the address and gas used in the console
  });
};

export default func;
func.tags = ["EtherWallet"];
