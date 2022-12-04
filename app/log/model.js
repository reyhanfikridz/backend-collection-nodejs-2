/*
log/model : contain log model
*/
// import node modules
const mongoose = require("mongoose")

// set log schema for log model
const LogSchema = new mongoose.Schema({
  text: {type: String, required: true},
  type: {type: String, required: true},
  username: {type: String, required: true},
  file_dir: {type: String, required: true},
  line: {type: Number, required: true},
  created_at: {type: Date, required: true},
  updated_at: {type: Date, required: true},
})

// initialize log model in mongoose (Note: this code can only run ONCE)
const LogModel = new mongoose.model("Log", LogSchema)

// export initialized log model
module.exports = LogModel
