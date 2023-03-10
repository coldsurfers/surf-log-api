import { prisma } from '../database/instance'
import BlogArticleCategory from './BlogArticleCategory'
import BlogArticleTag from './BlogArticleTag'

export default class BlogArticle {
  public id!: number

  public title!: string

  public content!: string

  public thumbnail!: string

  public excerpt!: string

  public blogArticleCategoryId!: number

  public blogArticleCategory!: Pick<BlogArticleCategory, 'name'>

  public blogArticleTags!: Pick<BlogArticleTag, 'name'>[]

  public isPublic!: boolean

  public createdAt!: Date

  public constructor(
    params: Pick<
      BlogArticle,
      | 'title'
      | 'content'
      | 'thumbnail'
      | 'excerpt'
      | 'blogArticleCategory'
      | 'blogArticleTags'
    >
  ) {
    const {
      title,
      content,
      thumbnail,
      excerpt,
      blogArticleCategory,
      blogArticleTags,
    } = params
    this.title = title
    this.content = content
    this.thumbnail = thumbnail
    this.excerpt = excerpt
    this.blogArticleCategory = blogArticleCategory
    this.blogArticleTags = blogArticleTags
  }

  public static async findByExcerpt(excerpt: string) {
    try {
      return await prisma.blogArticle.findFirst({
        where: {
          excerpt,
          isPublic: true,
        },
        include: {
          blogArticleCategory: {
            select: {
              name: true,
            },
          },
          blogArticleTags: {
            select: {
              blogArticleTag: {
                select: {
                  name: true,
                },
              },
            },
          },
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
    isPublic = true,
  }: {
    page: number
    category?: string
    tag?: string
    count?: number
    isPublic?: boolean
  }) {
    try {
      return await prisma.blogArticle.findMany({
        where: {
          isPublic,
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

  public async create() {
    try {
      const {
        title,
        excerpt,
        thumbnail,
        content,
        blogArticleTags,
        blogArticleCategory,
      } = this
      const blogArticle = await prisma.blogArticle.create({
        data: {
          title,
          excerpt,
          thumbnail,
          content,
          isPublic: true,
          blogArticleCategory: {
            connect: {
              name: blogArticleCategory.name,
            },
          },
          blogArticleTags: {
            create: blogArticleTags.map((tag) => ({
              blogArticleTag: {
                create: {
                  name: tag.name,
                },
              },
            })),
          },
        },
      })
      return blogArticle
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
