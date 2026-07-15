"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: IconType;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      icon: Icon,
      error,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {label}
        </label>

        <div className="relative">
          {Icon && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="h-5 w-5" />
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`
              h-14
              w-full
              rounded-2xl
              border
              bg-white/5
              text-white
              placeholder:text-gray-500
              transition-all
              duration-200
              outline-none

              ${
                Icon
                  ? "pl-12 pr-4"
                  : "px-4"
              }

              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/10 focus:border-orange-500"
              }

              ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }

              focus:ring-4
              ${
                error
                  ? "focus:ring-red-500/10"
                  : "focus:ring-orange-500/10"
              }

              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${id}-error`}
            className="mt-2 text-sm text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;