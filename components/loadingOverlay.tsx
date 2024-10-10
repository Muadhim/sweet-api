import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <svg
        className="animate-spin h-12 w-12 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12c0 1.42.25 2.77.71 4.02l1.48-.67C4.39 14.33 4 13.24 4 12c0-4.42 3.58-8 8-8 1.24 0 2.33.39 3.35 1.02l1.52-1.52C16.28 2.25 14.19 2 12 2z"
        />
      </svg>
    </div>
  );
};

export default LoadingOverlay;
