import { FastifyPluginCallback } from 'fastify'
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
  fastify.post('/save', saveBlogArticleHandler)
  done()
}

export default articleRouter
