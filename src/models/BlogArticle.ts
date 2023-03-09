import { prisma } from '../database/instance'
import BlogArticleCategory from './BlogArticleCategory'

export default class BlogArticle {
  public id!: number

  public title!: string

  public content!: string

  public thumbnail!: string

  public excerpt!: string

  public blogArticleCategoryId!: number

  public blogArticleCategory!: Pick<
    BlogArticleCategory,
    'id' | 'createdAt' | 'name'
  >

  public createdAt!: Date

  public static async findByExcerpt(excerpt: string) {
    try {
      return await prisma.blogArticle.findUnique({
        where: {
          excerpt,
        },
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  public static async list({
    page,
    category,
    tag,
    count = 15,
  }: {
    page: number
    category?: string
    tag?: string
    count?: number
  }) {
    try {
      return await prisma.blogArticle.findMany({
        where: {
          blogArticleCategory: category
            ? {
                name: category,
              }
            : undefined,
          blogArticleTags: tag
            ? {
                some: {
                  blogArticleTag: {
                    name: tag,
                  },
                },
              }
            : undefined,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: count,
        skip: (page - 1) * count,
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
