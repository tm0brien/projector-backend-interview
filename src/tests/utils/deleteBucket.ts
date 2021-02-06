import * as S3 from 'utils/s3'

const deleteBucket = async (bucket: string) => {
    await S3.deleteBucket(bucket)
}

export default deleteBucket
