// log some info to the debug console
export const info = (message: string) => {
    // eslint-disable-next-line no-console
    console.log(message)
}

// log an error message, an Error object, or an error message and Error object to the debug console
export const error = (message: string | Error, err?: Error) => {
    // eslint-disable-next-line no-console
    console.log(message)
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    }
}
