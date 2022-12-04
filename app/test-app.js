/*
test-app : setup testing application for tests
*/
// import node modules
const request = require("supertest")

// import apps modules
const app = require("./app")

// set testing app
testApp = request(app)

// export test app
module.exports = testApp
