const mongoose = require("mongoose");
const Config = require("config");

async function connect() {
  const address = Config.get('application.mongo.address');
  const username = Config.get('application.mongo.username');
  const password = Config.get('application.mongo.password');
  const encodedPassword = encodeURIComponent(password); // Use encodeURIComponent to ensure special characters are correctly parsed
  
  // FIXME: specify the database name
  await mongoose.connect(`mongodb://${username}:${encodedPassword}@${address}/`, {
    // mongoose automatically does connection pooling and by default max pool size is 100.
    // We want this to be smaller to reduce load on server.
    // https://mongoosejs.com/docs/connections.html#connection_pools
    maxPoolSize: 10,
  });
}

module.exports = { connect };
