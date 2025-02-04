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
          <p className="mt-4 text-sm text-gray-600">Data provided by TMDB (The Movie Database)</p>
            <p className="mt-4 text-sm text-gray-600">
            Inspired by Jim Vallandingham's <a href="https://vallandingham.me/seriesheat/#/" target="_blank" className="text-blue-500 underline">"SeriesHeat"</a>
            </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

