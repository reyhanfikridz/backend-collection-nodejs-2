// load env file
require("dotenv").config()

// set config
var config = {
  "app": {
    "ip": "127.0.0.1",
    "port": 3000,
  },
  "db": {
    "url": process.env.DATABASE_URL,
  }
}

// if testing, change db url to testing
if (process.env.NODE_ENV === "test") {
  config.db.url = process.env.TEST_DATABASE_URL
}

// export config
module.exports = config
