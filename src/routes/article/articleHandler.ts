import { RouteHandler } from 'fastify'
import hasAdminPermission from '../../lib/hasAdminPermission'
import BlogArticle from '../../models/BlogArticle'

export const blogArticleByExcerptHandler: RouteHandler<{
  Params: {
    excerpt: string
  }
}> = async (req, rep) => {
  const { excerpt } = req.params
  try {
    const blogArticle = await BlogArticle.findByExcerpt(excerpt)
    if (blogArticle && !blogArticle.isPublic) {
      if (hasAdminPermission(req.ip)) {
        return rep.status(200).send(blogArticle)
      }
      return rep.status(404).send()
    }
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
    isPublic?: string
  }
}> = async (req, rep) => {
  const { ip } = req
  const { page, category, tag, count, isPublic } = req.query
  if (typeof isPublic === 'string') {
    if (!hasAdminPermission(ip)) {
      return rep.status(404).send()
    }
    if (isPublic !== 'true' && isPublic !== 'false') {
      return rep.status(400).send()
    }
  }
  try {
    const list = await BlogArticle.list({
      page: page ? +page : 1,
      category,
      tag,
      count: count ? +count : undefined,
      isPublic: isPublic ? JSON.parse(isPublic) : undefined,
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
    isPublic: boolean
  }
}> = async (req, rep) => {
  const { title, excerpt, thumbnail, category, editorText, tags, isPublic } =
    req.body
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
      isPublic,
    })
    const created = await blogArticle.create()
    return rep.status(200).send(created)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const deleteArticleByExcerptHandler: RouteHandler<{
  Params: {
    excerpt: string
  }
}> = async (req, rep) => {
  const { excerpt } = req.params
  try {
    await BlogArticle.removeByExcerpt(excerpt)
    return rep.status(204).send()
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
