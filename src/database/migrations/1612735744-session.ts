import mysql from 'mysql'

// create the session table
const session1612735744 = async (connection: mysql.Connection) =>
    new Promise<void>((resolve, reject) =>
        connection.query(
            `CREATE TABLE IF NOT EXISTS session (
                id VARCHAR(36) PRIMARY KEY,
                user VARCHAR(36),
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted TIMESTAMP NULL DEFAULT NULL) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
            err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    )

export default session1612735744
