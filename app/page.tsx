"use client"

import { useState, useEffect, useRef } from "react"
import { Tv } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import type { Show, SearchResult } from "@/types/show"
import { useDebounce } from "use-debounce"
import { SearchResults } from "@/components/search-results"
import { InfoModal } from "@/components/info-modal"

const GAME_OF_THRONES_ID = "1399"

export default function SeriesHeat() {
  const [colorScheme, setColorScheme] = useState("1")
  const [isFlipped, setIsFlipped] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: number
      name: string
      first_air_date?: string
    }>
  >([])
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch Game of Thrones data when the component mounts
    handleShowSelect(GAME_OF_THRONES_ID)
  }, [])

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results)
        })
        .finally(() => setIsLoading(false))
    } else {
      setSearchResults([])
    }
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleShowSelect = async (showId: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/show/${showId}`)
      const data = await res.json()
      setSelectedShow(data)
      setSearchQuery(data.title)
    } catch (error) {
      console.error("Error fetching show details:", error)
    }
    setIsLoading(false)
  }

  const getColorScheme2 = (rating: number) => {
    if (rating >= 9.0) return "bg-green-500"
    if (rating >= 8.0) return "bg-green-400"
    if (rating >= 7.0) return "bg-green-300"
    if (rating >= 6.0) return "bg-yellow-300"
    if (rating >= 5.0) return "bg-red-300"
    return "bg-red-500"
  }

  const getColorScheme3 = (rating: number) => {
    if (rating >= 9.0) return "bg-blue-500"
    if (rating >= 8.0) return "bg-blue-400"
    if (rating >= 7.0) return "bg-blue-300"
    if (rating >= 6.0) return "bg-purple-300"
    if (rating >= 5.0) return "bg-pink-300"
    return "bg-pink-500"
  }

  const getRatingColor = (rating: number) => {
    if (colorScheme === "2") return getColorScheme2(rating)
    if (colorScheme === "3") return getColorScheme3(rating)
    // Default to color scheme 1
    if (rating >= 9.0) return "bg-orange-500"
    if (rating >= 8.0) return "bg-orange-300"
    if (rating >= 7.0) return "bg-orange-200"
    if (rating >= 6.0) return "bg-blue-100"
    if (rating >= 5.0) return "bg-purple-200"
    return "bg-purple-800"
  }

  const getRatingTextColor = (rating: number) => {
    if (rating < 7.0) return "text-white"
    return "text-black"
  }

  const getMaxEpisodes = (ratings: { [key: string]: number[] } | undefined) => {
    if (!ratings) return 0
    return Math.max(...Object.values(ratings).map((season) => season.length), 0)
  }

  const transposeRatings = (ratings: { [key: string]: number[] }) => {
    const seasons = Object.keys(ratings)
    const maxEpisodes = getMaxEpisodes(ratings)
    const transposed: { [key: string]: number[] } = {}

    for (let i = 0; i < maxEpisodes; i++) {
      transposed[`Episode ${i + 1}`] = seasons.map((season) => ratings[season][i] || 0)
    }

    return transposed
  }

  const calculateSquareSize = (ratings: { [key: string]: number[] }) => {
    const numSeasons = Object.keys(ratings).length
    const numEpisodes = getMaxEpisodes(ratings)
    const maxDimension = Math.max(numSeasons, numEpisodes)

    if (maxDimension <= 20) return 10
    if (maxDimension <= 30) return 8
    if (maxDimension <= 50) return 5
    if (maxDimension <= 60) return 4
    return 3
  }

  const renderGrid = (ratings: { [key: string]: number[] } | undefined) => {
    if (!ratings) return null

    const data = isFlipped ? transposeRatings(ratings) : ratings
    const rowLabels = Object.keys(data)
    const columnLabels = isFlipped
      ? Object.keys(ratings)
      : Array.from({ length: getMaxEpisodes(ratings) }, (_, i) => `${i + 1}`)

    const squareSize = calculateSquareSize(ratings)
    const fontSize = squareSize <= 6 ? "text-[0.5rem]" : squareSize <= 8 ? "text-xs" : "text-sm"

    return (
      <div className="relative overflow-x-auto">
        <div className="flex flex-col">
          <div className="flex h-10 items-end mb-2">
            <div className="w-20 shrink-0"></div>
            <div className="flex-grow text-center text-lg font-semibold">{isFlipped ? "Season" : "Episode"}</div>
          </div>
          <div className="flex justify-center">
            <div className="w-10 shrink-0 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform -rotate-90 origin-center whitespace-nowrap text-lg font-semibold">
                  {isFlipped ? "Episode" : "Season"}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <div className="w-10 shrink-0 relative"></div>
                {columnLabels.map((label) => (
                  <div
                    key={label}
                    className={`w-${squareSize} h-${squareSize} flex items-center justify-center ${fontSize} font-medium px-1`}
                  >
                    {label}
                  </div>
                ))}
              </div>
              {rowLabels.map((rowLabel) => (
                <div key={rowLabel} className="flex">
                  <div
                    className={`w-10 shrink-0 h-${squareSize} flex items-center justify-end pr-2 ${fontSize} font-medium`}
                  >
                    {isFlipped ? rowLabel.split(" ")[1] : rowLabel}
                  </div>
                  {data[rowLabel].map((rating, i) => (
                    <div
                      key={i}
                      className={`w-${squareSize} h-${squareSize} flex items-center justify-center border border-white ${
                        rating > 0 ? getRatingColor(rating) : "bg-white"
                      } ${rating > 0 ? getRatingTextColor(rating) : ""} ${fontSize}`}
                    >
                      {rating > 0 ? rating.toFixed(1) : ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="mx-auto p-6 flex flex-col flex-grow">
        <header className="flex flex-col items-center space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Tv className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">Episode Ratings Heat Map</h1>
          </div>
          <div className="flex items-center gap-2">
            <span>made with </span>
            <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">
              <svg
              fill="currentColor"
              viewBox="0 0 40 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="size-6"
              >
              <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" />
              <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" />
              </svg>
            </a>
            <span>by Waldemar Hujo </span>
            <InfoModal />
          </div>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center gap-10">
            <div className="flex justify-between items-start flex-col gap-6">
              <div className="relative w-[300px]" ref={searchContainerRef}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search TV shows..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                />
                <SearchResults
                  results={searchResults}
                  isLoading={isLoading}
                  onSelect={async (show) => {
                    setSearchQuery(show.name)
                    setSearchResults([])
                    await handleShowSelect(show.id.toString())
                  }}
                />
              </div>

              {selectedShow && (
                <div className="flex items-center gap-2 justify-center">
                  <h2 className="text-4xl font-bold">{selectedShow.title}</h2>
                  <div className="bg-[#01b4e4] text-white px-2 py-0.5 font-bold">TMDB</div>
                </div>
              )}
            </div>

            <div className="flex items-end gap-6 flex-col">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Color Scheme</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setColorScheme(num.toString())}
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          colorScheme === num.toString() ? "bg-gray-600 text-white" : "bg-white border border-gray-300"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Flip</span>
                  <Switch
                    checked={isFlipped}
                    onCheckedChange={setIsFlipped}
                    className="bg-gray-200 data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center">
                {[
                  { label: "Great", rating: 9.5 },
                  { label: "Good", rating: 8.5 },
                  { label: "Regular", rating: 7.5 },
                  { label: "Bad", rating: 6.0 },
                  { label: "Garbage", rating: 4.0 },
                ].map(({ label, rating }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${getRatingColor(rating)}`} />
                    <span className={rating < 5.0 ? "text-purple-800" : ""}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10">Loading...</div>
          ) : selectedShow && selectedShow.ratings ? (
            <div className="space-y-4">{renderGrid(selectedShow.ratings)}</div>
          ) : (
            <div className="text-center py-10">
              No show selected or no ratings available. Please search for a TV show.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

