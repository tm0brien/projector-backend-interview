import uuidv4 from '@lukeed/uuid'

const createBucketName = () => {
    // compute a test bucket name
    const bucket = `test${uuidv4().replace(/-/g, '')}`
    return bucket
}

export default createBucketName
