export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-dark-border rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-dark-text-muted text-sm font-mono">Loading...</p>
    </div>
  )
}
