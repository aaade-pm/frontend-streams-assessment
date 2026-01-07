import * as React from "react";
import { NextPageContext } from "next";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

/**
 * Next.js Custom Error Page
 * This is the special way Next.js handles errors in the pages router.
 *
 * This component is rendered when:
 * - A 404 error occurs (statusCode: 404)
 * - A 500 error occurs (statusCode: 500)
 * - An unhandled error is thrown during SSR or getInitialProps
 *
 * @param statusCode - HTTP status code (404, 500, etc.)
 * @param err - The error object if available
 */
function Error({ statusCode, err }: ErrorProps) {
  const errorMessage =
    statusCode === 404
      ? "Page not found"
      : err?.message || "An unexpected error occurred";

  const errorDescription =
    statusCode === 404
      ? "The page you're looking for doesn't exist."
      : "Something went wrong on our end. Please try again later.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-white">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        {statusCode || "Error"}
      </h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">
        {errorMessage}
      </h2>
      <p className="text-base text-slate-600 mb-6 max-w-md">
        {errorDescription}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => (window.location.href = "/")} variant="default">
          Go Home
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
