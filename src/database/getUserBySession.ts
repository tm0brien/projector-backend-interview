import mysql from 'mysql'

// query the database for a user by session id
const getUserBySession = (connection: mysql.Connection, session: string) =>
    new Promise<any>((resolve, reject) =>
        connection.query(
            `SELECT user.id, user.firstName, user.lastName, user.emailAddress, user.password FROM user 
                INNER JOIN session ON user.id=session.user 
                WHERE session.id=? AND session.deleted IS NULL AND user.deleted IS NULL`,
            [session],
            (err, rows) => {
                if (err) {
                    return reject(err)
                }
                if (!rows || rows.length != 1) {
                    throw new Error(`unknown session '${session}'`)
                }
                resolve(rows[0])
            }
        )
    )

export default getUserBySession
