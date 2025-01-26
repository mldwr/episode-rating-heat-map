export interface Show {
  id: number
  title: string
  ratings: {
    [key: string]: number[]
  }
}

export interface SearchResult {
  id: number
  name: string
}

