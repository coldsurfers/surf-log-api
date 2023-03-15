import { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node'
import Fastify from 'fastify'
import { articleRouter } from '../../src/routes/article'
import { categoryRouter } from '../../src/routes/category'
import { fileRouter } from '../../src/routes/file'

const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
  trustProxy: true,
})

fastify.register(articleRouter, { prefix: '/article' })
fastify.register(categoryRouter, { prefix: '/category' })
fastify.register(fileRouter, { prefix: '/file' })

const handler: VercelApiHandler = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  } else {
    // todo: add white list url of cors
    res.setHeader('Access-Control-Allow-Origin', 'https://blog.coldsurf.io')
    // res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://'
    // )
  }
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  await fastify.ready()
  fastify.server.emit('request', req, res)
}

export default handler
