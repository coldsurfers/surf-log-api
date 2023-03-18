import { prisma } from '../database/instance'
import BlogArticle from './BlogArticle'

export default class BlogArticleCategory {
  public id!: number

  public name!: string

  public blogArticles!: BlogArticle[]

  public createdAt!: Date

  public static async getAll() {
    try {
      const allBlogArticleCategories =
        await prisma.blogArticleCategory.findMany({})
      return allBlogArticleCategories
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
