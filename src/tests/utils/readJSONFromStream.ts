import stream from 'stream'
import readAllFromStream from './readAllFromStream'

const readJSONFromStream = async (dataStream: stream.Readable): Promise<any> => {
    const body = await readAllFromStream(dataStream)
    return JSON.parse(body.toString('utf8'))
}

export default readJSONFromStream
