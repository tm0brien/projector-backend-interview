import mysql from 'mysql'

const dropDatabase = async (database: string) => {
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
    return new Promise<void>((resolve, reject) => {
        // create the database
        connection.query(`DROP DATABASE ${database}`, err => {
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
                resolve()
            })
        })
    })
}

export default dropDatabase
