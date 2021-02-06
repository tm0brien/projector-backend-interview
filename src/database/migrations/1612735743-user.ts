import mysql from 'mysql'

// create the user table
const user1612735743 = async (connection: mysql.Connection) =>
    new Promise<void>((resolve, reject) =>
        connection.query(
            `CREATE TABLE IF NOT EXISTS user (
                id VARCHAR(36) PRIMARY KEY,
                emailAddress TEXT,
                firstName TEXT,
                lastName TEXT,
                password TEXT,
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

export default user1612735743
