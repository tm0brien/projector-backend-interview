import { Request, Response } from 'express'
import * as Log from 'log'
import ApiError from 'errors/apiError'

export const error = (req: Request, res: Response, error?: Error | ApiError | string) => {
    const apiError = ApiError.wrap(error ?? 'internal error')
    Log.error(apiError.innerError)
    res.status(apiError.statusCode || 500)
    res.write(apiError.innerError.message)
    res.end()
}

export const text = (res: Response, body: string, statusCode?: number) => {
    if (statusCode) {
        res.statusCode = statusCode
    }
    res.write(body)
}

export const json = (res: Response, body: any, statusCode?: number) => {
    if (statusCode) {
        res.statusCode = statusCode
    }
    res.json(body)
}

export const success = (res: Response) => {
    res.sendStatus(200)
}
