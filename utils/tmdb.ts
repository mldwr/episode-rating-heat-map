const TMDB_API_BASE = 'https://api.themoviedb.org/3'

export async function searchShows(query: string) {
  const response = await fetch(
    `${TMDB_API_BASE}/search/tv?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.json()
}

export async function getShowDetails(id: number) {
  const response = await fetch(
    `${TMDB_API_BASE}/tv/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.json()
}

export async function getSeasonDetails(showId: number, seasonNumber: number) {
  const response = await fetch(
    `${TMDB_API_BASE}/tv/${showId}/season/${seasonNumber}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.json()
}

