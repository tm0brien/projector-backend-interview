import { Request, Response } from 'express'

import * as ResponseUtils from 'utils/response'

const user = app => async (req: Request, res: Response) => {
    try {
        // report the user record to the caller
        const { id, emailAddress, firstName, lastName } = res.locals.userRecord
        ResponseUtils.json(res, { id, emailAddress, firstName, lastName })
    } catch (err) {
        // write an error response back
        ResponseUtils.error(req, res, err)
    }
}

export default user
