import Article from './article'

export default class ArticleTag {
  public id!: number

  public name!: string

  public blogArticles!: Article[]

  public createdAt!: Date
}
