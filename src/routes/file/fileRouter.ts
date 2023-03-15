import { FastifyPluginCallback } from 'fastify'
import { fileUploadHandler } from './fileHandler'

const { ALLOWED_ADMIN_IP } = process.env

const fileRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:directory', {
    onRequest: async (req, rep, next) => {
      if (req.ip !== ALLOWED_ADMIN_IP) {
        return rep.status(404).send()
      }
      return next()
    },
    handler: fileUploadHandler,
  })
  done()
}

export default fileRouter
