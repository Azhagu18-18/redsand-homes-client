"use client";

import { ButtonHTMLAttributes } from "react";
import { HiArrowRight } from "react-icons/hi2";

interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export default function SubmitButton({
  children,
  isLoading = false,
  loadingText = "Please wait...",
  fullWidth = true,
  disabled,
  className = "",
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`
        group
        relative
        inline-flex
        h-14
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-orange-500
        via-orange-600
        to-orange-500
        px-6
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-orange-500/20
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-orange-500/30
        focus:outline-none
        focus:ring-4
        focus:ring-orange-500/30
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:translate-y-0
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-3">
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
            aria-hidden="true"
          />
          <span>{loadingText}</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span>{children}</span>

          <HiArrowRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      )}
    </button>
  );
}