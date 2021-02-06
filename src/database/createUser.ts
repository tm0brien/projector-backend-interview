import mysql from 'mysql'

// create a new user in the database
const createUser = (
    connection: mysql.Connection,
    user: {
        id: string
        firstName: string
        lastName: string
        emailAddress: string
        encryptedPassword: string
    }
) =>
    new Promise<void>((resolve, reject) =>
        connection.query(
            `INSERT INTO user (id, firstName, lastName, emailAddress, password) VALUES (?, ?, ?, ?, ?)`,
            [user.id, user.firstName, user.lastName, user.emailAddress, user.encryptedPassword],
            err => {
                if (err) {
                    return reject(err)
                }
                resolve()
            }
        )
    )

export default createUser
