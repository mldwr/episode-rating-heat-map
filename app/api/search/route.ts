import { searchShows } from '@/utils/tmdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return new Response('Query parameter is required', { status: 400 })
  }

  try {
    const data = await searchShows(query)
    return Response.json({
      results: data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        first_air_date: result.first_air_date
      }))
    })
  } catch (error) {
    return new Response('Error fetching shows', { status: 500 })
  }
}

