/*
app - contain main application
*/
// import node modules
const express = require("express")

// import apps modules
const logRouter = require("./log/router")

// init express app
let app = express()

// set express middleware
app.use(express.json()) // set express to only accept json and automatically parse json

// set express router
app.use("/api", logRouter) // log router

// export app
module.exports = app
