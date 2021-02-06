import bcrypt from 'bcrypt'
import uuidv4 from '@lukeed/uuid'
import { Request, Response } from 'express'

import * as RequestUtils from 'utils/request'
import * as ResponseUtils from 'utils/response'

import createUser from 'database/createUser'
import createSession from 'database/createSession'

const signup = app => async (req: Request, res: Response) => {
    try {
        // attempt to parse the required parameters from the body of the POST request
        const firstName = RequestUtils.bodyAsString(req, 'firstName')
        const lastName = RequestUtils.bodyAsString(req, 'lastName')
        const emailAddress = RequestUtils.bodyAsString(req, 'emailAddress')
        const password = RequestUtils.bodyAsString(req, 'password')
        // compute a new user id
        const id = uuidv4()
        // encrypt the user's password with bcrypt
        const encryptedPassword = await bcrypt.hash(password, 10)
        // create the user in the database
        await createUser(app.databaseConnection, { id, firstName, lastName, emailAddress, encryptedPassword })
        // compute a new session id
        const session = uuidv4()
        // create a new session record in the database
        await createSession(app.databaseConnection, session, id)
        // set the session cookie
        res.cookie('session', session, {
            domain: 'localhost'
        })
        // report the session in the JSON response as well as in the cookie
        ResponseUtils.json(res, { session }, 201)
    } catch (err) {
        // write an error response back
        ResponseUtils.error(req, res, err)
    }
}

export default signup
