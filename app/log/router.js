/*
log/router : contain log router and route handlers
*/
// import node modules
const express = require("express")

// import apps modules
const LogModel = require("./model")

// handler for route add new log data
async function addLogHandler(req, res) {
  try {
    req.body["created_at"] = new Date(Date.now())
    req.body["updated_at"] = new Date(Date.now())

    let newLog = new LogModel(req.body)
    await newLog.save()
    res.status(201).json({
      "message": "Add log success!",
      "added_log": newLog
    })
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        "message": `Add log failed! Error: ${err}`,
      })
      return
    }
    res.status(500).json({
      "message": `Add log failed! Error: ${err}`,
    })
  }
}

// handler for route get one log data
async function getLogHandler(req, res) {
  try {
    let log = await LogModel.findById(req.params["id"]).exec()
    res.status(200).json(log)
  } catch (err) {
    res.status(500).json({
      "message": `Get log failed! Error: ${err}`,
    })
  }
}

// handler for route get logs data
async function getLogsHandler(req, res) {
  try {
    let logs = await LogModel.find(req.query).exec()
    res.status(200).json(logs)
  } catch (err) {
    res.status(500).json({
      "message": `Get logs failed! Error: ${err}`,
    })
  }
}

// handler for route replace one log
async function replaceLogHandler(req, res) {
  try {
    req.body["updated_at"] = new Date(Date.now())

    let replacedLog = await LogModel.findOneAndReplace(
      {"_id": req.params["id"]}, req.body, {new: true}).exec()
    res.status(200).json({
      "message": "Replace log success!",
      "replaced_log": replacedLog
    })
  } catch (err) {
    res.status(500).json({
      "message": `Replace logs failed! Error: ${err}`,
    })
  }
}

// handler for route update one log
async function updateLogHandler(req, res) {
  try {
    req.body["updated_at"] = new Date(Date.now())

    let updatedLog = await LogModel.findByIdAndUpdate(
      req.params["id"], req.body, {new: true}).exec()
    res.status(200).json({
      "message": "Update log success!",
      "updated_log": updatedLog
    })
  } catch (err) {
    res.status(500).json({
      "message": `Update logs failed! Error: ${err}`,
    })
  }
}

// handler for route delete one log data
async function deleteLogHandler(req, res) {
  try {
    await LogModel.findByIdAndRemove(req.params["id"]).exec()
    res.status(200).json({
      "message": "Delete log success!"
    })
  } catch (err) {
    res.status(500).json({
      "message": `Delete log failed! Error: ${err}`,
    })
  }
}

// set log router
logRouter = express.Router()
logRouter.post("/logs", addLogHandler)
logRouter.get("/logs/:id", getLogHandler)
logRouter.get("/logs", getLogsHandler)
logRouter.put("/logs/:id", replaceLogHandler)
logRouter.patch("/logs/:id", updateLogHandler)
logRouter.delete("/logs/:id", deleteLogHandler)

// export log router
module.exports = logRouter
