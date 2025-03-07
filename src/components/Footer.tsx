export default function Footer() {
  return (
    <footer className="py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-[1440px] mx-auto px-5">
        <div className="flex flex-col items-center justify-center text-white dark:text-gray-200">
          <p className="text-lg font-medium mb-2">
            Made with <span className="text-red-500 dark:text-red-400">❤</span> by Bùi Quang Trưởng
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>© 2024</span>
            <span>•</span>
            <span className="animate-bounce">⚡</span>
            <span>Portfolio</span>
            <span>•</span>
            <span className="animate-pulse">(❁´◡`❁)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


