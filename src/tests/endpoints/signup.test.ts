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

test('signup', async () => {
    const app = new App()
    // initialize the app
    await app.initialize(testDatabase, testBucket)
    // start listening for requests, pass in '0' as the listen port
    //  to let the operating system allocate the listen port for us
    const listenPort = await app.listen(0)

    // post to the signup endpoint
    let response = await fetch(`http://localhost:${listenPort}/v1/signup`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            firstName: 'Jane',
            lastName: 'Doe',
            emailAddress: 'jane@doe.com',
            password: 'password'
        })
    })
    // we should get a 201 OK response
    expect(response.status).toBe(201)

    // read the response body as text
    const body = await response.json()
    // check that the body has the session token
    expect(body.session).toBeDefined()

    // get the user
    response = await fetch(`http://localhost:${listenPort}/v1/user`, {
        method: 'GET',
        headers: { Cookie: `session=${body.session}` }
    })
    // we should get a 200 OK response
    expect(response.status).toBe(200)

    // shutdown the app
    await app.shutdown()
})

afterAll(async () => {
    // dispose of the test database
    await TestUtils.dropDatabase(testDatabase)
    await TestUtils.deleteBucket(testBucket)
})
