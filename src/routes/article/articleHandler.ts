import { RouteHandler } from 'fastify'
import BlogArticle from '../../models/BlogArticle'

export const blogArticleByExcerptHandler: RouteHandler<{
  Params: {
    excerpt: string
  }
}> = async (req, rep) => {
  const { excerpt } = req.params
  try {
    const blogArticle = await BlogArticle.findByExcerpt(excerpt)
    return rep.status(200).send(blogArticle)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const blogArticleListRouteHandler: RouteHandler<{
  Querystring: {
    page?: number
    category?: string
    tag?: string
    count?: number
  }
}> = async (req, rep) => {
  const { page, category, tag, count } = req.query
  try {
    const list = await BlogArticle.list({
      page: page ? +page : 1,
      category,
      tag,
      count: count ? +count : undefined,
    })
    return rep.status(200).send(list)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const saveBlogArticleHandler: RouteHandler<{
  Body: {
    title: string
    excerpt: string
    thumbnail: string
    category: string
    editorText: string
    tags: string[]
  }
}> = async (req, rep) => {
  const { title, excerpt, thumbnail, category, editorText, tags } = req.body
  try {
    const blogArticle = new BlogArticle({
      title,
      excerpt,
      thumbnail,
      blogArticleCategory: {
        name: category,
      },
      blogArticleTags: tags.map((tagname) => ({
        name: tagname,
      })),
      content: editorText,
    })
    return await blogArticle.create()
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
