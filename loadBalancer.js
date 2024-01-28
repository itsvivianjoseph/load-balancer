const { PriorityRoundRobin } = require('round-robin-js');
const serverHealth = require('server-health');

function createLoadBalancer(servers) {
  return new PriorityRoundRobin(
    (a, b) => (a.health ? -1 : 1) - (b.health ? -1 : 1),
    servers
  );
}

function addServerHealthChecks(servers) {
  servers.forEach((server, index) => {
    serverHealth.addConnectionCheck(`server${index}`, () => server.health);
  });
}

module.exports = {
  createLoadBalancer,
  addServerHealthChecks,
};