import fetch from 'node-fetch'

import App from 'app'
import * as TestUtils from 'tests/utils'

let testDatabase: string
let testBucket: string

beforeAll(async () => {
    try {
        // create a test database
        testDatabase = await TestUtils.createDatabase()
        testBucket = await TestUtils.createBucketName()
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        throw err
    }
})

test('serve HTML', async () => {
    const app = new App()
    // initialize the app
    await app.initialize(testDatabase, testBucket)
    // start listening for requests, pass in '0' as the listen port
    //  to let the operating system allocate the listen port for us
    const listenPort = await app.listen(0)

    // fetch the root
    const response = await fetch(`http://localhost:${listenPort}`)
    // we should get a 200 OK response
    expect(response.status).toBe(200)

    // read the response body as text
    const body = await response.text()
    // check that the body starts with the text "<html>"
    expect(body).toMatch(/^<html>/)

    // shutdown the app
    await app.shutdown()
})

afterAll(async () => {
    // dispose of the test database
    await TestUtils.dropDatabase(testDatabase)
    await TestUtils.deleteBucket(testBucket)
})
