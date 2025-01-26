interface SearchResult {
  id: number
  name: string
  first_air_date?: string
}

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  onSelect: (show: SearchResult) => void
}

export function SearchResults({ results, isLoading, onSelect }: SearchResultsProps) {
  if (!results.length && !isLoading) return null

  return (
    <div className="absolute z-50 mt-1 w-full bg-white text-black rounded-md shadow-lg border">
      {isLoading ? (
        <div className="p-4 text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="max-h-60 overflow-auto py-2">
          {results.map((show) => (
            <li key={show.id}>
              <button
                onClick={() => onSelect(show)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                <div className="text-sm font-medium">{show.name}</div>
                {show.first_air_date && (
                  <div className="text-xs text-gray-500">{new Date(show.first_air_date).getFullYear()}</div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

