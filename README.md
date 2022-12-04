# backend-collection-nodejs-2

### Version: release-1.0 (2022-12-04)

### Summary:
This is Nodejs backend number 2 from my backend collection project. This backend is a REST API for CRUD log data build with Express framework and Mongoose (MongoDB Object Document Mapper), also tested with Jest framework.

### Requirements:
1. nodejs (tested: v14.17.5, v18.12.1)
2. npm (tested: v6.14.14, v8.19.2)
3. mongodb (tested: v6.0.1, v6.0.2)

### Steps to run the backend server:
1. install all requirements
2. clone repository `https://github.com/reyhanfikridz/backend-collection-nodejs-2`
3. at repository root directory (same level as README.md):
    1. switch to branch release-1.0 with `git checkout release-1.0`
    2. install required node modules with `npm ci`
    3. create file .env with contents:

    ```
    DATABASE_URL="<mongodb database URL, example: mongodb://127.0.0.1:27017/backendcollectionnodejs2>"
    TEST_DATABASE_URL="<mongodb database URL, example: mongodb://127.0.0.1:27017/backendcollectionnodejs2test>"

    # Node environment will automatically change to "test"
    # when testing using Jest
    NODE_ENV="<development or production or test>" 
    ```

    4. create mongo databases with name same as in .env file, which is backendcollectionnodejs2 and backendcollectionnodejs2test
    5. test server first with `npm test` to make sure server works fine
    6. run server with `npm start`

### API collection:
1. Go to https://www.postman.com/reyhanfikri/workspace/backend-collection-nodejs-2/overview
2. Choose `release-1.0` collection

### License:
This project is MIT license, so basically you can use it for personal or commercial use as long as the original LICENSE.md included in your project.
