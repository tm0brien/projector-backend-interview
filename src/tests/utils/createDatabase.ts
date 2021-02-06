import uuidv4 from '@lukeed/uuid'
import mysql from 'mysql'

const createDatabase = async () => {
    // compute a test database name
    const database = `test${uuidv4().replace(/-/g, '')}`
    // create a new connection to MySQL, for this sample application,
    //  we'll insecurely hard code the connection parameters rather than have them
    //  be configured by environment variables and secrets
    const connection = mysql.createConnection({
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'root'
    })
    // create a new promise
    return new Promise<string>((resolve, reject) => {
        // create the database
        connection.query(`CREATE DATABASE ${database}`, err => {
            if (err) {
                // handle any errors
                return reject(err)
            }
            // close the connection
            connection.end(err => {
                if (err) {
                    // handle any errors
                    return reject(err)
                }
                // report the generated test database name
                resolve(database)
            })
        })
    })
}

export default createDatabase
