const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://localhost:27017", {
    // mongoose automatically does connection pooling and by default max pool size is 100.
    // We want this to be smaller to reduce load on server.
    // https://mongoosejs.com/docs/connections.html#connection_pools
    maxPoolSize: 10,
  });
}

module.exports = { connect };
