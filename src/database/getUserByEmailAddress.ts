import mysql from 'mysql'

// query the database for a user by their emailAddress
const getUserByEmailAddress = (connection: mysql.Connection, emailAddress: string) =>
    new Promise<any>((resolve, reject) =>
        connection.query(`SELECT * FROM user WHERE emailAddress=? AND deleted IS NULL`, [emailAddress], (err, rows) => {
            if (err) {
                return reject(err)
            }
            if (!rows || rows.length != 1) {
                throw new Error(`unknown user '${emailAddress}'`)
            }
            resolve(rows[0])
        })
    )

export default getUserByEmailAddress
