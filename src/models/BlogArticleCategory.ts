import BlogArticle from './BlogArticle'

export default class BlogArticleCategory {
  public id!: number

  public name!: string

  public blogArticles!: BlogArticle[]

  public createdAt!: Date
}
