import { getShowDetails, getSeasonDetails } from '@/utils/tmdb'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const show = await getShowDetails(Number(params.id))
    
    // Fetch all seasons
    const seasonPromises = Array.from({ length: show.number_of_seasons }, (_, i) => 
      getSeasonDetails(Number(params.id), i + 1)
    )
    
    const seasons = await Promise.all(seasonPromises)
    
    // Format the data for our heatmap
    const ratings: { [key: string]: number[] } = {}
    
    seasons.forEach((season, index) => {
      ratings[index + 1] = season.episodes.map((episode: any) => 
        episode.vote_average
      )
    })

    return Response.json({
      title: show.name,
      ratings
    })
  } catch (error) {
    return new Response('Error fetching show details', { status: 500 })
  }
}

