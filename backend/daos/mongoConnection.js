const mongoose = require("mongoose");

async function connect() {
  const username = 'devroot';
  const password = 'devroot';
  const encodedPassword = encodeURIComponent(password); // Use encodeURIComponent to ensure special characters are correctly parsed
  
  // FIXME: specify the database name
  await mongoose.connect(`mongodb://${username}:${encodedPassword}@localhost:27017/`, {
    // mongoose automatically does connection pooling and by default max pool size is 100.
    // We want this to be smaller to reduce load on server.
    // https://mongoosejs.com/docs/connections.html#connection_pools
    maxPoolSize: 10,
  });
}

module.exports = { connect };
