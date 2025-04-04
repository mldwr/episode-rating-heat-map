import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function InfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center">
          <Info className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>About Episode Rating Heat Map</DialogTitle>
          <DialogDescription>The tool visualizes the avarage ratings for TV show episodes.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="text-sm font-medium mb-2">How to use:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Search for a TV show using the search bar</li>
            <li>View the heatmap of episode ratings</li>
            <li>Use the color scheme buttons to change the visualization</li>
            <li>Toggle the "Flip" switch to transpose the heatmap</li>
          </ul>
            <p className="mt-4 text-sm">Data provided by TMDB (The Movie Database)</p>
            <p className="mt-4 text-sm">
            Inspired by Jim Vallandingham's <a href="https://vallandingham.me/seriesheat/#/" target="_blank" className="text-blue-500 underline">"SeriesHeat"</a>
            </p>
        </div>

          <div className="flex items-center gap-2 text-sm">
              made with
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
              by Waldemar Hujo 
            </div>
      </DialogContent>
    </Dialog>
  )
}

