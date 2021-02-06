import mysql from 'mysql'

// create a new session in the database
const createSession = (connection: mysql.Connection, id: string, userId: string) =>
    new Promise<void>((resolve, reject) =>
        connection.query(`INSERT INTO session (id, user) VALUES (?, ?)`, [id, userId], err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    )

export default createSession
