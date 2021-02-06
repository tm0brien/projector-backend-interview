import mysql from 'mysql'

import user1612735743 from './migrations/1612735743-user'
import session1612735744 from './migrations/1612735744-session'

const createConnection = async (database: string) => {
    // create a new connection to MySQL, for this sample application,
    //  we'll insecurely hard code the connection parameters rather than have them
    //  be configured by environment variables and secrets
    const connection = mysql.createConnection({
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'root',
        database
    })

    // run the migrations
    await user1612735743(connection)
    await session1612735744(connection)

    return connection
}

export default createConnection
