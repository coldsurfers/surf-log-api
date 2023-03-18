import { FastifyPluginCallback } from 'fastify'
import {
  getAllBlogArticleCategories,
  getAllBlogArticlesHandler,
  getAllBlogArticleTags,
} from './ciHandler'

const { CI_KEY } = process.env

const ciRouter: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.addHook('onRequest', (req, rep, next) => {
    if (!req.headers['ci-key']) {
      return rep.status(404).send()
    }
    const ciKey = req.headers['ci-key']
    if (ciKey !== CI_KEY) {
      return rep.status(404).send()
    }
    return next()
  })

  fastify.get('/articles', {
    handler: getAllBlogArticlesHandler,
  })
  fastify.get('/categories', {
    handler: getAllBlogArticleCategories,
  })
  fastify.get('/tags', {
    handler: getAllBlogArticleTags,
  })
  done()
}

export default ciRouter
