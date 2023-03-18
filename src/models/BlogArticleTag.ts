import { prisma } from '../database/instance'
import BlogArticle from './BlogArticle'

export default class BlogArticleTag {
  public id!: number

  public name!: string

  public blogArticles!: BlogArticle[]

  public createdAt!: Date

  public static async getAll() {
    try {
      const allBlogArticleTags = await prisma.blogArticleTag.findMany({
        where: {
          blogArticles: {
            every: {
              blogArticle: {
                isPublic: true,
                deletedAt: null,
              },
            },
          },
        },
        distinct: 'name',
      })
      return allBlogArticleTags
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
