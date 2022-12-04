/*
test-setup : setup database connection before and after all tests
*/
// import node modules
const mongoose = require("mongoose")

// import apps modules
const config = require("./config")

// setup before all tests
beforeAll(async () => {
  await mongoose.connect(config.db.url)
})

// setup after all tests
afterAll(async () => {
  await mongoose.connection.close()
})
