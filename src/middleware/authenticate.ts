import { Request, Response, NextFunction } from 'express'

import ApiError from 'errors/apiError'
import * as ResponseUtils from 'utils/response'
import getUserBySession from 'database/getUserBySession'

const authenticate = (app, redirectOnError) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // attempt to get the session id
        const sessionId = req.cookies['session']
        // check for a missing session cookie
        if (!sessionId) {
            throw new ApiError(`missing session cookie`)
        }
        // lookup the user in the database by their session
        const userRecord = await getUserBySession(app.databaseConnection, sessionId)
        // report the user record to the caller
        res.locals.userRecord = userRecord
        // invoke the next function in the middleware chain
        next()
    } catch (err) {
        if (redirectOnError) {
            // if we should redirect on error, then send the user to the signin page
            res.redirect(`/signin?return_to=${req.url.toString()}`)
        } else {
            // otherwise, report the error
            ResponseUtils.error(req, res, err)
        }
    }
}

export default authenticate
