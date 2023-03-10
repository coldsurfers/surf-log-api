import { FastifyPluginCallback } from 'fastify'
import { blogArticleCategoryListHandler } from './categoryHandler'

const categoryRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/list', blogArticleCategoryListHandler)
  done()
}

export default categoryRouter
