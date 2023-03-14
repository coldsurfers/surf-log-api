import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { RouteHandler } from 'fastify'

const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION } =
  process.env

export const fileUploadHandler: RouteHandler<{
  Params: {
    directory: string
  }
  Querystring: {
    filename?: string
    filetype?: string
  }
}> = async (req, rep) => {
  const { directory } = req.params
  if (directory !== 'thumbnails' && directory !== 'content-images') {
    return rep.status(400).send()
  }
  const { filename, filetype } = req.query
  if (!filename || !filetype) return rep.status(400).send()
  try {
    const s3Client = new S3Client({
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID ?? '',
        secretAccessKey: S3_SECRET_ACCESS_KEY ?? '',
      },
    })

    const post = await createPresignedPost(s3Client, {
      Bucket: S3_BUCKET_NAME ?? '',
      Key: `${directory}/${filename}` as string,
      Fields: {
        acl: 'public-read',
        'Content-Type': filetype as string,
      },
      Expires: 10, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576 * 3], // up to 1 MB * 3 = 3 MB
      ],
    })

    return rep.status(200).send(post)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
