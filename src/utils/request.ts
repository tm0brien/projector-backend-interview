import express from 'express'
import ApiError from 'errors/apiError'

export const getContentLength = (req: express.Request): number | undefined => {
    let contentLength = req.get('content-length') || req.get('x-content-length')
    if (contentLength) {
        return parseInt(contentLength)
    }
    return undefined
}

export const queryAsIntOpt = (req: express.Request, paramName: string): number | undefined => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return parseInt(value)
    }
    return undefined
}

export const queryAsInt = (req: express.Request, paramName: string, defaultValue?: number): number => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return parseInt(value)
    } else if (defaultValue === undefined) {
        throw new ApiError(`missing query parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const queryAsFloatOpt = (req: express.Request, paramName: string): number | undefined => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return parseFloat(value)
    }
    return undefined
}

export const queryAsFloat = (req: express.Request, paramName: string, defaultValue?: number): number => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return parseFloat(value)
    }
    if (defaultValue === undefined) {
        throw new ApiError(`missing query parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const queryAsStringOpt = (req: express.Request, paramName: string): string | undefined => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return value
    }
    return undefined
}

export const queryAsString = (req: express.Request, paramName: string, defaultValue?: string): string => {
    const value = req.query[paramName]
    if (typeof value === 'string') {
        return value
    }
    if (defaultValue === undefined) {
        throw new ApiError(`missing query parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const getBodyAsJSON = <T>(req: express.Request): T => {
    const contentType = req.get('content-type')
    if (!contentType?.includes('application/json')) {
        throw new ApiError(`unexpected content type ${contentType}`, 400)
    }
    return req.body as T
}

export const bodyAsIntOpt = (req: express.Request, paramName: string): number | undefined => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'number') {
        return value
    } else if (typeof value === 'string') {
        return parseInt(value)
    }
    return undefined
}

export const bodyAsInt = (req: express.Request, paramName: string, defaultValue?: number): number => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'number') {
        return value
    } else if (typeof value === 'string') {
        return parseInt(value)
    } else if (defaultValue === undefined) {
        throw new ApiError(`missing body parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const bodyAsFloatOpt = (req: express.Request, paramName: string): number | undefined => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'number') {
        return value
    } else if (typeof value === 'string') {
        return parseFloat(value)
    }
    return undefined
}

export const bodyAsFloat = (req: express.Request, paramName: string, defaultValue?: number): number => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'number') {
        return value
    } else if (typeof value === 'string') {
        return parseFloat(value)
    } else if (defaultValue === undefined) {
        throw new ApiError(`missing body parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const bodyAsStringOpt = (req: express.Request, paramName: string): string | undefined => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'string') {
        return value
    } else if (value !== undefined) {
        return value.toString()
    }
    return undefined
}

export const bodyAsString = (req: express.Request, paramName: string, defaultValue?: string): string => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'string') {
        return value
    } else if (value !== undefined) {
        return value.toString()
    } else if (defaultValue === undefined) {
        throw new ApiError(`missing body parameter ${paramName}`, 400)
    }
    return defaultValue
}

export const bodyAsObjectOpt = <T>(req: express.Request, paramName: string): T | undefined => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'object' && !Array.isArray(value)) {
        return value
    }
    return undefined
}

export const bodyAsObject = <T>(req: express.Request, paramName: string, defaultValue?: T): T => {
    const body = getBodyAsJSON<any>(req)
    const value = body[paramName]
    if (typeof value === 'object' && !Array.isArray(value)) {
        return value as T
    } else if (defaultValue === undefined) {
        throw new ApiError(`missing body parameter ${paramName}`, 400)
    }
    return defaultValue
}
