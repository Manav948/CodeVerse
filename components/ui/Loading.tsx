import React from "react"

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-72 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-white/10" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded-md bg-white/10" />
            <div className="h-3 w-full rounded-md bg-white/10" />
          </div>
        </div>
        <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>
    </div>
  )
}

export default Loader
