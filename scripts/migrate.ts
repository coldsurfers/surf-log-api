import { prisma } from '../src/database/instance'
import { Article, ArticleMeta } from '../src/types/migration'
import metaJSON from './data/article-meta.json'

async function createCategory() {
  const categorynames = ['dev', 'etc', 'life', 'univ', 'velog']
  const create = async (name: string) => {
    const existing = await prisma.blogArticleCategory.findUnique({
      where: {
        name,
      },
    })
    if (!existing) {
      await prisma.blogArticleCategory.create({
        data: {
          name,
        },
      })
    }
  }
  // eslint-disable-next-line no-return-await
  await Promise.all(categorynames.map(async (name) => await create(name)))
}

async function createArticle() {
  const create = async ([excerpt, article]: [string, Article]) => {
    const existing = await prisma.blogArticle.findUnique({
      where: {
        excerpt,
      },
    })
    if (!existing) {
      await prisma.blogArticle.create({
        data: {
          excerpt,
          content: article.content,
          createdAt: article.data.createdAt
            ? new Date(article.data.createdAt)
            : undefined,
          thumbnail: article.data.thumbnail ?? '',
          title: article.data.title ?? '',
          blogArticleCategory: {
            connectOrCreate: {
              create: {
                name: article.data.category!,
              },
              where: {
                name: article.data.category!,
              },
            },
          },
          blogArticleTags: article.data.tags
            ? {
                create: article.data.tags.map((tag) => ({
                  blogArticleTag: {
                    create: {
                      name: tag,
                    },
                  },
                })),
              }
            : undefined,
        },
      })
    }
  }

  const { articles } = metaJSON as ArticleMeta
  const articlesEntries = Object.entries(articles)
  await Promise.all(
    articlesEntries.map(
      // eslint-disable-next-line no-return-await
      async ([excerpt, article]) => await create([excerpt, article])
    )
  )
}

async function migrate() {
  await createCategory()
  await createArticle()
}

migrate()
