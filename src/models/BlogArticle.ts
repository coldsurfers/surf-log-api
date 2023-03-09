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
}
