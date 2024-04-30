const voteDao = require("../daos/voteDao");
const logger = require("../utils/logger.js");

async function getVotesBy({ userId }, page, limit) {
  const votes = await voteDao.getVotesBy({ userId }, page, limit);
  return votes;
}

async function getTotalNumRecords({ userId }) {
  const totalNumRecords = await voteDao.getTotalNumRecords({ userId });
  logger.info(
    `got total number of votes for userId=${userId} totalNumRecords = ${totalNumRecords}`
  );

  return totalNumRecords;
}
module.exports = { getVotesBy, getTotalNumRecords };
