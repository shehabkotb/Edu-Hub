import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { getS3Credintials } from './config'

const client = new S3Client({
  credentials: getS3Credintials(),
  region: '***REMOVED***'
})

// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketName = 'eduhub-course-files'
const bucketURL = `https://${bucketName}.s3.amazonaws.com/`

const uploadFile = async (courseId, directory, fileName, file, fileType) => {
  const key = `${courseId}/${directory}/${Date.now()}_${fileName}`
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: fileType
  }
  const command = new PutObjectCommand(params)
  await client.send(command)
  return bucketURL + key
}

const deleteFile = async (fileURL) => {
  const key = fileURL.split('.com/')[1]
  const params = { Bucket: bucketName, Key: key }
  const command = new DeleteObjectCommand(params)
  await client.send(command)
}

// const getSignedURL = async () => {
//   const params = {
//     Bucket: bucketName,
//     Key: 'someid/testdir'
//   }

//   const command = new PutObjectCommand(params)
//   const url = await getSignedUrl(client, command, { expiresIn: 3600 })
//   return url
// }

const s3Service = { uploadFile, deleteFile }
export default s3Service
