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
  fastify.get('/list', {
    onRequest: (req, rep, next) => {
      const { ip } = req
      const { isPublic } = req.query
      if (typeof isPublic === 'string') {
        if (isPublic !== 'true' && isPublic !== 'false') {
          return rep.status(400).send()
        }
        if (isPublic === 'false') {
          if (!hasAdminPermission(ip)) {
            return rep.status(404).send()
          }
        }
      }
      return next()
    },
    handler: blogArticleListRouteHandler,
  })
  fastify.post('/save', {
    onRequest: (req, rep, next) => {
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
