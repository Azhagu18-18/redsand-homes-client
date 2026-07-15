"use client";

import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface SocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  provider: string;
  isLoading?: boolean;
}

export default function SocialButton({
  icon: Icon,
  provider,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: SocialButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={`Continue with ${provider}`}
      className={`
        group
        inline-flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        text-sm
        font-medium
        text-gray-200
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-orange-500/40
        hover:bg-orange-500/10
        hover:text-orange-400
        focus:outline-none
        focus:ring-4
        focus:ring-orange-500/20
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"
            aria-hidden="true"
          />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Icon
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
          <span>Continue with {provider}</span>
        </>
      )}
    </button>
  );
}