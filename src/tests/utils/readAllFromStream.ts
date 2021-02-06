import stream from 'stream'

const readAllFromStream = async (dataStream: stream.Readable): Promise<Buffer> =>
    new Promise((resolve, reject) => {
        let data: Buffer = Buffer.alloc(0)
        dataStream.on('data', (chunk: Buffer) => {
            data = Buffer.concat([data, chunk])
        })
        dataStream.on('error', (error: Error) => reject(error))
        dataStream.on('end', () => {
            resolve(data)
        })
    })

export default readAllFromStream
