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

test('app init and shutdown', async () => {
    const app = new App()
    // initialize the app
    await app.initialize(testDatabase, testBucket)
    // start listening for requests, pass in '0' as the listen port
    //  to let the operating system allocate the listen port for us
    await app.listen(0)
    // shutdown the app
    await app.shutdown()
})

afterAll(async () => {
    // dispose of the test database
    await TestUtils.dropDatabase(testDatabase)
    await TestUtils.deleteBucket(testBucket)
})
