import { FastifyPluginCallback } from 'fastify'
import {
  blogArticleByExcerptHandler,
  blogArticleListRouteHandler,
} from './articleHandler'

const articleRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.get('/:excerpt', blogArticleByExcerptHandler)
  fastify.get('/list', blogArticleListRouteHandler)
  done()
}

export default articleRouter
