import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info, User, Lightbulb, Database } from "lucide-react"

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

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <p>
              Made by <span className="font-semibold">Waldemar Hujo</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-gray-500" />
            <p>
              Inspired by Jim Vallandingham's{" "}
              <a
                href="https://vallandingham.me/seriesheat/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600 transition-colors"
              >
                "SeriesHeat"
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gray-500" />
            <p>
              Data provided by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600 transition-colors"
              >
                TMDB (The Movie Database)
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 py-4 border-t border-gray-200">
          <h4 className="flex items-center gap-2 text-base font-semibold mb-3">
            <Info className="w-5 h-5 text-blue-500" />
            How to use:
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
            <li>Search for a TV show using the search bar.</li>
            <li>View the heatmap of episode ratings.</li>
            <li>Use the color scheme buttons to change the visualization.</li>
            <li>Toggle the "Flip" switch to transpose the heatmap.</li>
          </ul>
        </div>

      </DialogContent>
    </Dialog>
  )
}

