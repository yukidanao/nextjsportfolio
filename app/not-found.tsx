import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <span className="text-8xl font-mono font-bold text-accent mb-4">404</span>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Page not found
      </h1>
      <p className="text-gray-500 dark:text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-secondary transition-all duration-200"
      >
        Go home
      </Link>
    </div>
  );
}
