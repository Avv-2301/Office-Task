const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  const url = process.env.MONGO_CONNECTION_STRING;

  mongoose.connect(url).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

const disconnect = () => {
  if (!mongoose.connection) {
    return;
  }

  mongoose.disconnect();

  mongoose.once("close", async () => {
    console.log("Disconnected to database");
  });
};

module.exports = {
  connect,
  disconnect,
};
