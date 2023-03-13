import { FastifyPluginCallback } from 'fastify'

const fileRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/', async (req, res) => res.status(200).send())
  done()
}

export default fileRouter
