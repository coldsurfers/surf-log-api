import { RouteHandler } from 'fastify'
import { prisma } from '../../database/instance'

export const blogArticleCategoryListHandler: RouteHandler = async (
  req,
  rep
) => {
  try {
    const categories = await prisma.blogArticleCategory.findMany({})
    return rep.status(200).send(categories)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
