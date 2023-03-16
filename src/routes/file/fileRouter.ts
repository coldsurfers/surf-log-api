import { FastifyPluginCallback } from 'fastify'
import hasAdminPermission from '../../lib/hasAdminPermission'
import { fileUploadHandler } from './fileHandler'

const fileRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:directory', {
    onRequest: async (req, rep, next) => {
      if (hasAdminPermission(req.ip)) {
        return next()
      }
      return rep.status(404).send()
    },
    handler: fileUploadHandler,
  })
  done()
}

export default fileRouter
