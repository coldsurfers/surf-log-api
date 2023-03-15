import { FastifyPluginCallback } from 'fastify'
import {
  blogArticleByExcerptHandler,
  blogArticleListRouteHandler,
  deleteArticleByExcerptHandler,
  saveBlogArticleHandler,
} from './articleHandler'

const { ALLOWED_ADMIN_IP } = process.env

const articleRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:excerpt', blogArticleByExcerptHandler)
  fastify.delete('/:excerpt', deleteArticleByExcerptHandler)
  fastify.get('/list', blogArticleListRouteHandler)
  fastify.post('/save', {
    onRequest: async (req, rep, next) => {
      if (req.ip !== ALLOWED_ADMIN_IP) {
        return rep.status(404).send()
      }
      return next()
    },
    handler: saveBlogArticleHandler,
  })
  done()
}

export default articleRouter
