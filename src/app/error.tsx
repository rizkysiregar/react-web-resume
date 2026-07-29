'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
        <p className="text-foreground/60 mb-6">
          An unexpected error occurred. Please try again later.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="px-6 py-2 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/20 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
