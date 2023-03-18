import { RouteHandler } from 'fastify'
import BlogArticle from '../../models/BlogArticle'
import BlogArticleCategory from '../../models/BlogArticleCategory'
import BlogArticleTag from '../../models/BlogArticleTag'

export const getAllBlogArticlesHandler: RouteHandler = async (req, rep) => {
  try {
    const allBlogArticles = await BlogArticle.getAll({
      isPublic: true,
      isDeleted: false,
    })
    return rep.status(200).send(allBlogArticles)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const getAllBlogArticleCategories: RouteHandler = async (req, rep) => {
  try {
    const allBlogArticleCategories = await BlogArticleCategory.getAll()
    return rep.status(200).send(allBlogArticleCategories)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const getAllBlogArticleTags: RouteHandler = async (req, rep) => {
  try {
    const allBlogArticlesTags = await BlogArticleTag.getAll()
    return rep.status(200).send(allBlogArticlesTags)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
