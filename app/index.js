/*
index - executable file
*/
// import apps modules
const app = require("./app")
const config = require("./config")
const mongoose = require("mongoose")

// connect database first then app start listening
mongoose.connect(config.db.url, (err)=>{
  if (err) {
    console.log(`Connect to database failed! Error : ${err}`)
    process.exit(1)
  }

  app.listen(config.app.port, config.app.ip, (err) => {
    if (err) {
      console.log(`App failed to listen! Error : ${err}`)
      process.exit(1)
    }
    console.log(`App listening at ${config.app.ip}:${config.app.port}`)
  })
})
