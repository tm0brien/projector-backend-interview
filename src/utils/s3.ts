import stream from 'stream'
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

export const getAWSCredentials = () =>
    // create new AWS credentials, for this sample application,
    //  we'll insecurely hard code the connection parameters rather than have them
    //  be configured by environment variables and secrets
    new AWS.Credentials({
        accessKeyId: 'accessKey1',
        secretAccessKey: 'verySecretKey1'
    })

const getClientConfiguration = () => {
    let configuration: S3.ClientConfiguration = {
        region: 'us-west-2'
    }
    configuration.credentials = getAWSCredentials()
    configuration.endpoint = 'http://localhost:8000'
    configuration.s3ForcePathStyle = true
    configuration.sslEnabled = false
    return configuration
}

export const downloadFromS3 = (bucket: string, key: string): stream.Readable => {
    return new S3(getClientConfiguration())
        .getObject({
            Bucket: bucket,
            Key: key
        })
        .createReadStream()
}

export const downloadFromS3Ex = async (
    bucket: string,
    key: string
): Promise<{ dataStream: stream.Readable; contentType?: string; etag?: string }> => {
    return new Promise((resolve, reject) => {
        const request = new S3(getClientConfiguration()).getObject({
            Bucket: bucket,
            Key: key
        })
        request.on('error', err => {
            reject(err)
        })
        request.on('httpHeaders', (statusCode, headers) => {
            const dataStream = request.createReadStream()
            resolve({
                dataStream,
                contentType: headers['content-type'],
                etag: headers['etag']
            })
        })
        request.send()
    })
}

export const uploadToS3 = async (
    bucket: string,
    key: string,
    data: stream.Readable,
    contentType?: string,
    forcePublic?: boolean
): Promise<void> => {
    return new S3(getClientConfiguration())
        .upload({
            Bucket: bucket,
            Key: key,
            ACL: forcePublic ? 'public-read' : 'private',
            ContentType: contentType,
            Body: data
        })
        .promise()
        .then(sendData => {
            // returning nothing
        })
}

export const createBucket = async (bucket: string, forcePublic?: boolean) =>
    new S3(getClientConfiguration())
        .createBucket({ Bucket: bucket, ACL: forcePublic ? 'public-read' : 'private' })
        .promise()

export const deleteBucket = async (bucket: string) => {
    const s3 = new S3(getClientConfiguration())
    // figure out all the objects in the bucket
    const output = await s3.listObjects({ Bucket: bucket }).promise()
    // filter and prepare the objects in the bucket list to be an argument to delete objects
    const objectIdentifierList = output.Contents?.filter(object => object.Key).map(object => ({
        Key: object.Key!
    }))
    if (objectIdentifierList && objectIdentifierList.length) {
        // if there are any objects to delete, delete them
        await s3
            .deleteObjects({
                Bucket: bucket,
                Delete: { Objects: objectIdentifierList }
            })
            .promise()
    }
    // finally delete the bucket
    await s3.deleteBucket({ Bucket: bucket }).promise()
}

export const listObjectsOnS3 = async (bucket: string, prefix: string): Promise<string[]> => {
    const s3 = new S3(getClientConfiguration())
    // figure out all the objects in the bucket
    const output = await s3.listObjects({ Bucket: bucket, Prefix: prefix }).promise()
    return output.Contents?.map(object => object.Key) as string[]
}

export const deleteFromS3 = async (bucket: string, keys: string[]) => {
    const s3 = new S3(getClientConfiguration())
    await s3
        .deleteObjects({
            Bucket: bucket,
            Delete: { Objects: keys.map(key => ({ Key: key })) }
        })
        .promise()
}
