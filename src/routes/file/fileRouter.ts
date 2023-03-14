import { FastifyPluginCallback } from 'fastify'
import { fileUploadHandler } from './fileHandler'

const fileRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:directory', fileUploadHandler)
  done()
}

export default fileRouter
