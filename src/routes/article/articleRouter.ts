import { FastifyPluginCallback } from 'fastify'
import hasAdminPermission from '../../lib/hasAdminPermission'
import {
  blogArticleByExcerptHandler,
  blogArticleListRouteHandler,
  deleteArticleByExcerptHandler,
  saveBlogArticleHandler,
} from './articleHandler'

const articleRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:excerpt', blogArticleByExcerptHandler)
  fastify.delete('/:excerpt', deleteArticleByExcerptHandler)
  fastify.get('/list', blogArticleListRouteHandler)
  fastify.post('/save', {
    onRequest: async (req, rep, next) => {
      if (hasAdminPermission(req.ip)) {
        return next()
      }
      return rep.status(404).send()
    },
    handler: saveBlogArticleHandler,
  })
  done()
}

export default articleRouter
