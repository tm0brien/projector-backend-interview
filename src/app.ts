import net from 'net'
import mysql from 'mysql'
import * as S3 from 'utils/s3'

// import the express and middleware modules
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import authenticate from 'middleware/authenticate'

// import our database connection module
import createConnection from 'database/createConnection'

// import our endpoints
import html from 'endpoints/html'
import signup from 'endpoints/signup'
import signin from 'endpoints/signin'
import user from 'endpoints/user'

// the App class implements the backend application
export default class App {
    // the HTTP server used by express
    private server: net.Server
    // create a new instance of Express
    private express = express()
    // create a new MySQL database connection
    public databaseConnection: mysql.Connection
    // the S3 bucket name
    public bucket: string

    // initialize the App instance
    public async initialize(databaseName: string, bucketName: string) {
        // create the database connection
        this.databaseConnection = await createConnection(databaseName)

        // create the bucket if necessary
        await S3.listObjectsOnS3(bucketName, '*').catch(async err => {
            await S3.createBucket(bucketName, true)
        })
        this.bucket = bucketName

        // install some handy Express middleware
        this.express.use(cookieParser())
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.text())

        // register routes for our static HTML pages
        this.express.route('/').get(html(this, 'html/index.html'))
        this.express.route('/app').get(authenticate(this, true), html(this, 'html/app.html'))
        this.express.route('/settings').get(authenticate(this, true), html(this, 'html/settings.html'))
        this.express.route('/signin').get(html(this, 'html/signin.html'))
        this.express.route('/signup').get(html(this, 'html/signup.html'))

        // register routes for our REST endpoints
        this.express.route('/v1/signup').post(signup(this))
        this.express.route('/v1/signin').post(signin(this))
        this.express.route('/v1/user').get(authenticate(this, false), user(this))
    }

    // start listening for HTTP requests on the specified port
    public async listen(port: number): Promise<number> {
        // we'll return a promise that resolves when Express is ready for connections
        return new Promise<number>((resolve, reject) => {
            // tell Express to listen on the specified port
            this.server = this.express
                .listen(port, () => {
                    // get the listen port from the HTTP server
                    const listenPort = (this.server.address() as net.AddressInfo).port
                    // resolve the promise
                    resolve(listenPort)
                })
                .on('error', err => {
                    // if an error occurs, reject the promise
                    reject(err)
                })
        })
    }

    // gracefully shutdown the app
    public async shutdown() {
        return new Promise<void>((resolve, reject) => {
            // close the database connection
            this.databaseConnection.end(err => {
                if (err) {
                    // if an error occurs, reject the promise
                    return reject(err)
                }
                // ask express to gracefully shutdown
                this.server.close(err => {
                    if (err) {
                        // if an error occurs, reject the promise
                        return reject(err)
                    }
                    resolve()
                })
            })
        })
    }
}
