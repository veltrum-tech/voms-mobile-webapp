import {
  AlertTriangle,
  RefreshCw,
  WifiOff,
  Server,
  FileX,
  ArrowLeft,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "../../../lib/utils";


interface ErrorStateProps {
  /** Error object to automatically detect error type */
  error?: any;
  /** Manual override for error variant */
  variant?:
    | "network"
    | "server"
    | "notFound"
    | "generic"
    | "empty"
    | "unauthorized"
    | "timeout";
  /** Custom error title (overrides auto-detected title) */
  title?: string;
  /** Custom error message (overrides auto-detected message) */
  message?: string;
  /** Retry function */
  onRetry?: () => void;
  /** Custom action button */
  onAction?: () => void;
  /** Custom action button text */
  actionText?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Show back/home button */
  showNavigation?: boolean;
  /** Loading state for retry button */
  isRetrying?: boolean;
  /** Container classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Layout variant */
  layout?: "card" | "inline" | "fullscreen";
  /** Show error details in development */
  showErrorDetails?: boolean;
}

const ErrorState = ({
  error,
  variant,
  title,
  message,
  onRetry,
  onAction,
  actionText,
  showRetry = true,
  showNavigation = false,
  isRetrying = false,
  className,
  size = "md",
  layout = "card",
  // showErrorDetails = process.env.NODE_ENV === "development",
}: ErrorStateProps) => {
  // Auto-detect error type if not manually specified
  const detectErrorType = (err: any): ErrorStateProps["variant"] => {
    if (!err) return "generic";

    // Check for network connectivity
    if (!navigator.onLine) return "network";

    // Handle different error object structures
    const status = err?.status || err?.response?.status || err?.statusCode;
    const code = err?.code || err?.name;
    const message = err?.message || err?.error || "";

    // Network/Connection errors
    if (
      code === "NetworkError" ||
      code === "NETWORK_ERROR" ||
      code === "ERR_NETWORK" ||
      message.toLowerCase().includes("network") ||
      message.toLowerCase().includes("connection") ||
      message.toLowerCase().includes("fetch")
    ) {
      return "network";
    }

    // Timeout errors
    if (
      code === "TIMEOUT" ||
      code === "ERR_TIMEOUT" ||
      message.toLowerCase().includes("timeout") ||
      message.toLowerCase().includes("timed out")
    ) {
      return "timeout";
    }

    // HTTP Status codes
    switch (status) {
      case 400:
        return "generic";
      case 401:
      case 403:
        return "unauthorized";
      case 404:
        return "notFound";
      case 408:
        return "timeout";
      case 429:
        return "server";
      case 500:
      case 502:
      case 503:
      case 504:
        return "server";
      default:
        // Check for specific error types
        if (status >= 400 && status < 500) return "generic";
        if (status >= 500) return "server";
        return "generic";
    }
  };

  const detectedVariant = variant || detectErrorType(error);

  const getErrorConfig = () => {
    switch (detectedVariant) {
      case "network":
        return {
          icon: WifiOff,
          defaultTitle: "Connection Problem",
          defaultMessage:
            "Unable to connect to the server. Please check your internet connection and try again.",
          iconColor: "text-orange-500",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "server":
        return {
          icon: Server,
          defaultTitle: "Server Error",
          defaultMessage:
            "Something went wrong on our end. Our team has been notified and is working on a fix.",
          iconColor: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "notFound":
        return {
          icon: FileX,
          defaultTitle: "Not Found",
          defaultMessage:
            "The information you're looking for doesn't exist or may have been removed.",
          iconColor: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "empty":
        return {
          icon: FileX,
          defaultTitle: "No Data Available",
          defaultMessage:
            "There's no data to display at the moment. Try refreshing or check back later.",
          iconColor: "text-gray-500",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
      case "unauthorized":
        return {
          icon: Shield,
          defaultTitle: "Access Denied",
          defaultMessage:
            "You don't have permission to access this resource. Please sign in or contact support.",
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "timeout":
        return {
          icon: Clock,
          defaultTitle: "Request Timeout",
          defaultMessage:
            "The request took too long to complete. Please try again.",
          iconColor: "text-purple-500",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        };
      default:
        return {
          icon: AlertTriangle,
          defaultTitle: "Something Went Wrong",
          defaultMessage:
            "An unexpected error occurred. Please try again or contact support if the problem persists.",
          iconColor: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  // Extract error details for development
  // const getErrorDetails = () => {
  //   if (!error || !showErrorDetails) return null;

  //   const details = {
  //     status: error?.status || error?.response?.status || error?.statusCode,
  //     code: error?.code || error?.name,
  //     message: error?.message || error?.error,
  //     url: error?.config?.url || error?.url,
  //   };

  //   return Object.entries(details)
  //     .filter(([_, value]) => value)
  //     .map(([key, value]) => `${key}: ${value}`)
  //     .join(" | ");
  // };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "p-4",
          icon: "w-8 h-8",
          title: "text-lg",
          message: "text-sm",
          button: "h-8 px-3 text-sm",
        };
      case "lg":
        return {
          container: "p-8",
          icon: "w-16 h-16",
          title: "text-2xl",
          message: "text-base",
          button: "h-12 px-6 text-base",
        };
      default:
        return {
          container: "p-6",
          icon: "w-12 h-12",
          title: "text-xl",
          message: "text-sm",
          button: "h-10 px-4 text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();
  // const errorDetails = getErrorDetails();

  const content = (
    <div className="text-center space-y-4">
      {/* Icon with animated background */}
      <div className="flex justify-center">
        <div
          className={cn(
            "rounded-full p-3 animate-pulse",
            config.bgColor,
            config.borderColor,
            "border-2"
          )}
        >
          <IconComponent className={cn(sizeClasses.icon, config.iconColor)} />
        </div>
      </div>

      {/* Title and Message */}
      <div className="space-y-2">
        <h3 className={cn("font-semibold text-gray-900", sizeClasses.title)}>
          {title || config.defaultTitle}
        </h3>
        <p
          className={cn(
            "text-gray-600 max-w-md mx-auto leading-relaxed",
            sizeClasses.message
          )}
        >
          {message || config.defaultMessage}
        </p>

        {/* Error details in development */}
        {/* {errorDetails && (
          <details className="mt-4">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              Show Error Details
            </summary>
            <pre className="mt-2 text-xs text-left bg-gray-100 p-2 rounded overflow-auto max-w-full">
              {errorDetails}
            </pre>
          </details>
        )} */}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            className={cn("min-w-[120px]", sizeClasses.button)}
            variant="default"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </>
            )}
          </Button>
        )}

        {onAction && (
          <Button
            onClick={onAction}
            variant={'link'}
            className={cn("min-w-[120px]", sizeClasses.button)}
          >
            {actionText || "Go Back"}
          </Button>
        )}

        {showNavigation && (
          <Button
            onClick={() => window.history.back()}
            variant={'text'}
            className={cn("min-w-[120px]", sizeClasses.button)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>
    </div>
  );

  if (layout === "inline") {
    return <div className={cn("py-8", className)}>{content}</div>;
  }

  if (layout === "fullscreen") {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          className
        )}
      >
        <div className="max-w-md w-full mx-4">{content}</div>
      </div>
    );
  }

  return (
    <Card className={cn(sizeClasses.container, className)}>{content}</Card>
  );
};

export { ErrorState, type ErrorStateProps };
