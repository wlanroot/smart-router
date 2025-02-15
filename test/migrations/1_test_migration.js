const TRC20Mock = artifacts.require('./TRC20Mock.sol');
const PoolStableMock = artifacts.require('./PoolStableMock.sol');
const RouterV1Mock = artifacts.require('./RouterV1Mock.sol');
const RouterV2Mock = artifacts.require('./RouterV2Mock.sol');
const SmartExchangeRouterTest = artifacts.require(
  './SmartExchangeRouterTest.sol',
);

module.exports = function (deployer) {
  deployer.deploy(TRC20Mock).then(async (token) => {
    let old3 = await deployer.deploy(
      PoolStableMock,
      [token.address, token.address],
      10000000000,
    );
    let usdc = await deployer.deploy(
      PoolStableMock,
      [token.address, token.address],
      10000000000,
    );
    let v1 = await deployer.deploy(RouterV1Mock);
    let v2 = await deployer.deploy(RouterV2Mock);
    deployer.deploy(
      SmartExchangeRouterTest,
      old3.address,
      usdc.address,
      v2.address,
      v1.address,
      token.address,
      token.address,
      token.address,
      token.address,
      token.address,
    );
  });
};
