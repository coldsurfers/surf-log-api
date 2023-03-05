import ArticleCategory from './articleCategory'

export default class Article {
  public id!: number

  public title!: string

  public content!: string

  public thumbnail!: string

  public excerpt!: string

  public blogArticleCategoryId!: number

  public blogArticleCategory!: Pick<
    ArticleCategory,
    'id' | 'createdAt' | 'name'
  >

  public createdAt!: Date
}
