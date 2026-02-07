interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-dark-surface border border-dark-border rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center">
          <svg className="w-6 h-6 text-dark-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-dark-text mb-2">Something went wrong</h2>
        <p className="text-dark-text-muted text-sm mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
