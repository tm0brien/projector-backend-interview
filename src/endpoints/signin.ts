import bcrypt from 'bcrypt'
import uuidv4 from '@lukeed/uuid'
import { Request, Response } from 'express'

import ApiError from 'errors/apiError'
import * as RequestUtils from 'utils/request'
import * as ResponseUtils from 'utils/response'
import createSession from 'database/createSession'
import getUserByEmailAddress from 'database/getUserByEmailAddress'

const signin = app => async (req: Request, res: Response) => {
    try {
        // attempt to parse the required parameters from the body of the POST request
        const emailAddress = RequestUtils.bodyAsString(req, 'emailAddress')
        const password = RequestUtils.bodyAsString(req, 'password')
        // lookup the user in the database by their email address
        const userRecord = await getUserByEmailAddress(app.databaseConnection, emailAddress)
        // compare the user's password
        const passwordMatches = await bcrypt.compare(password, userRecord.password)
        // check for mismatch
        if (!passwordMatches) {
            throw new ApiError(`password mismatch`, 403)
        }
        // compute a new session id
        const session = uuidv4()
        // create a new session record in the database
        await createSession(app.databaseConnection, session, userRecord.id)
        // set the session cookie
        res.cookie('session', session, {
            domain: 'localhost'
        })
        // report the session in the JSON response as well as in the cookie
        ResponseUtils.json(res, { session })
    } catch (err) {
        // write an error response back
        ResponseUtils.error(req, res, err)
    }
}

export default signin
