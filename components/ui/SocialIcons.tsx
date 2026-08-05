const cn = (...c: (string | undefined | null | false)[]) => c.filter(Boolean).join(" ");

function IconBase({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center justify-center" aria-label={label} role="img">
      {children}
    </span>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <IconBase label="GitHub">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("w-5 h-5", className)}
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    </IconBase>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <IconBase label="LinkedIn">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("w-5 h-5", className)}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </IconBase>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <IconBase label="Facebook">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("w-5 h-5", className)}
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.028 4.412 11.03 10.206 11.93v-8.437H7.13v-3.493h3.076V9.413c0-3.026 1.792-4.697 4.533-4.697 1.314 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.926-1.956 1.876v2.25h3.328l-.532 3.493h-2.796v8.437C19.588 23.103 24 18.101 24 12.073Z" />
      </svg>
    </IconBase>
  );
}
