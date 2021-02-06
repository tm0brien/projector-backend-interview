// this line must be the first in the program; this enables source map support for transpiled apps
import 'source-map-support/register'
// import the backend application
import App from 'app'
// import logging methods
import * as Log from 'log'

async function main() {
    // log some status info
    Log.info('starting the app')

    // construct a new App instance
    const app = new App()
    // initialize the app
    await app.initialize('project', 'project')
    // start listening for HTTP requests on port 9090
    const listenPort = await app.listen(9090)
    // log that we're successfully listening
    Log.info(`listening on :${listenPort}`)

    // shutdown handler
    const shutdown = () => {
        // ask the app to gracefully shutdown
        app.shutdown()
            .then(() => {
                // log that we're successfully listening
                Log.info(`shutting down`)
                // on success, exit the process with code 0
                process.exit(0)
            })
            .catch(err => {
                // log the error
                Log.error('failed to shutdown', err)
                // on failure, exit the process with code 1
                process.exit(1)
            })
    }

    // hook the various posix signals that we might be sent to signal shutdown, and if we
    //  hear one of those signals, call shutdown()
    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    process.on('SIGHUP', shutdown)
}

// log unhandled rejections
process.on('unhandledRejection', (err: Error, promise) => {
    Log.error('unhandledRejection', err)
    process.exit(1)
})

// log uncaught exceptions
process.on('uncaughtException', err => {
    Log.error('uncaughtException', err)
    process.exit(1)
})

// start the program
main().catch(err => {
    Log.error(err)
    process.exit(1)
})
