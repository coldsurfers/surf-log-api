export interface ArticleData {
  title?: string
  category?: string
  createdAt?: string
  excerpt?: string
  thumbnail?: string | null
  tags?: string[]
}

export interface Article {
  content: string
  data: ArticleData
  excerpt: string
  isEmpty: boolean
  thumbnailBase64?: string
}

export interface ArticleMeta {
  articles: {
    [key: string]: Article
  }
  categories: string[]
}
