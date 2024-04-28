const voteDao = require("../daos/voteDao");

async function getVotingResultsBy(userId, page, limit) {
  const votes = await voteDao.getVotingResultsBy(userId, page, limit);
  return votes;
}
module.exports = { getVotingResultsBy };
