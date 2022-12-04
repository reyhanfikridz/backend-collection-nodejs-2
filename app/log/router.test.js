/*
log/router.test : testing for log router
*/
// import apps modules
const testApp = require("./../test-app")

// test API add new log data
describe("test API add new log data (POST /api/logs)", () => {
  // test API add new log data success
  it("should return 201 and return same data as the input", async () => {
    // add new log data
    let data = {
      "text": "Data Not Found",
      "type": "error",
      "username": "jamessmith",
      "file_dir": "/api/books/router.js",
      "line": 578,
    }

    let resp = await testApp
      .post("/api/logs")
      .send(data)

    // check the expected response
    expect(resp.status).toStrictEqual(201)
    expect(resp.body["added_log"]["text"]).toStrictEqual(data["text"])
    expect(resp.body["added_log"]["type"]).toStrictEqual(data["type"])
    expect(resp.body["added_log"]["username"]).toStrictEqual(data["username"])
    expect(resp.body["added_log"]["file_dir"]).toStrictEqual(data["file_dir"])
    expect(resp.body["added_log"]["line"]).toStrictEqual(data["line"])
  })

  // test API add new log data bad request
  it("should return 400 because data not valid", async () => {
    // add invalid log data and check the expected response
    let invalidData = "not valid"
    await testApp
      .post("/api/logs")
      .send(invalidData)
      .expect(400)
  })
})

// test API get one log data by id
describe("test API get one log data by id (GET /api/logs/:id)", () => {
  it("should return 200 and return the right data", async () => {
    // add new log data (must success)
    let data = {
      "text": "Data Not Found",
      "type": "error",
      "username": "jamessmith",
      "file_dir": "/api/books/router.js",
      "line": 578,
    }

    let resp = await testApp
      .post("/api/logs")
      .send(data)
      .expect(201)

    let expectedData = resp.body["added_log"]

    // get one log data by id and check the expected result
    resp = await testApp
      .get(`/api/logs/${expectedData["_id"]}`)
      .expect(200)

    expect(resp.body).toStrictEqual(expectedData)
  })
})

// test API get logs data
describe("test API get logs data (GET /api/logs)", () => {
  it("should return 200 and return the right data", async () => {
    // add two new log data (must success) so at least there's minimum 2 getted data
    let data = [{
      "text": "Data Not Found",
      "type": "error",
      "username": "paulwalson",
      "file_dir": "/api/books/router.js",
      "line": 578,
    }, {
      "text": "File Not Found",
      "type": "error",
      "username": "paulwalson",
      "file_dir": "/api/tags/router.js",
      "line": 23,
    }]

    for (let i = 0; i < data.length; i++) {
      let resp = await testApp
        .post("/api/logs")
        .send(data[i])
        .expect(201)

      data[i] = resp.body["added_log"]
    }

    // get logs data by params username and check the expected response
    resp = await testApp
      .get(`/api/logs/?username=paulwalson`)
      .expect(200)

    expect(resp.body.length).toBeGreaterThanOrEqual(2)
    for (let i = 0; i < resp.body.length; i++) {
      expect(resp.body[i]["username"]).toStrictEqual("paulwalson")
    }

    // get logs data by params type and check the expected response
    resp = await testApp
      .get(`/api/logs/?type=error`)
      .expect(200)

    expect(resp.body.length).toBeGreaterThanOrEqual(2)
    for (let i = 0; i < resp.body.length; i++) {
      expect(resp.body[i]["type"]).toStrictEqual("error")
    }

    // get logs data by params username+type and check the expected response
    resp = await testApp
      .get(`/api/logs/?username=paulwalson&type=error`)
      .expect(200)

    expect(resp.body.length).toBeGreaterThanOrEqual(2)
    for (let i = 0; i < resp.body.length; i++) {
      expect(resp.body[i]["username"]).toStrictEqual("paulwalson")
      expect(resp.body[i]["type"]).toStrictEqual("error")
    }
  })
})

// test API replace one log data by id
describe("test API replace one log data by id (PUT /api/logs/:id)", () => {
  it("should return 200 and return the right data", async () => {
    // add new log data (must success)
    let data = {
      "text": "Data Not Found",
      "type": "error",
      "username": "jamessmith",
      "file_dir": "/api/books/router.js",
      "line": 578,
    }

    let resp = await testApp
      .post("/api/logs")
      .send(data)
      .expect(201)

    data = resp.body["added_log"]

    // replace one log data by id and check the expected result
    let data2 = {
      "text": "Use == Instead Of is",
      "type": "warning",
      "username": "michaelthomas",
      "file_dir": "/api/tags/router.js",
      "line": 55,
    }

    resp = await testApp
      .put(`/api/logs/${data["_id"]}`)
      .send(data2)
      .expect(200)

    expect(resp.body["replaced_log"]["_id"]).toStrictEqual(data["_id"])
    expect(resp.body["replaced_log"]["text"]).toStrictEqual(data2["text"])
    expect(resp.body["replaced_log"]["type"]).toStrictEqual(data2["type"])
    expect(resp.body["replaced_log"]["username"]).toStrictEqual(data2["username"])
    expect(resp.body["replaced_log"]["file_dir"]).toStrictEqual(data2["file_dir"])
    expect(resp.body["replaced_log"]["line"]).toStrictEqual(data2["line"])
  })
})

// test API update one log data by id
describe("test API update one log data by id (PATCH /api/logs/:id)", () => {
  it("should return 200 and return the right data", async () => {
    let dataForUpdate = {
      "text": "Use == Instead Of is",
      "type": "warning",
      "username": "michaelthomas",
      "file_dir": "/api/tags/router.js",
      "line": 55,
    }

    for (key in dataForUpdate) {
      // add new log data (must success)
      let data = {
        "text": "Data Not Found",
        "type": "error",
        "username": "jamessmith",
        "file_dir": "/api/books/router.js",
        "line": 578,
      }

      let resp = await testApp
        .post("/api/logs")
        .send(data)
        .expect(201)

      data = resp.body["added_log"]

      // update one log field by id and check the expected result
      let data2 = {}
      data2[key] = dataForUpdate[key]

      resp = await testApp
        .patch(`/api/logs/${data["_id"]}`)
        .send(data2)
        .expect(200)

      for (let key2 in resp.body["updated_log"]) {
        if (["__v", "updated_at"].includes(key2)) {
          continue
        }

        if (key2 === key) {
          expect(resp.body["updated_log"][key2]).toStrictEqual(data2[key])
          continue
        }

        expect(resp.body["updated_log"][key2]).toStrictEqual(data[key2])
      }
    }
  })
})

// test API delete one log data by id
describe("test API delete one log data by id (DELETE /api/logs/:id)", () => {
  it("should return 200", async () => {
    // add new log data (must success)
    let data = {
      "text": "Data Not Found",
      "type": "error",
      "username": "jamessmith",
      "file_dir": "/api/books/router.js",
      "line": 578,
    }

    let resp = await testApp
      .post("/api/logs")
      .send(data)
      .expect(201)

    data = resp.body["added_log"]

    // delete one log data by id and check the expected result
    resp = await testApp
      .delete(`/api/logs/${data["_id"]}`)
      .expect(200)

    // get one log data by id and check the expected result
    resp = await testApp
      .get(`/api/logs/${data["_id"]}`)
      .expect(200)

    expect(resp.body).toBeNull()
  })
})
