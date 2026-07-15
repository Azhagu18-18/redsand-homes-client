"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  icon?: IconType;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
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
    const [showPassword, setShowPassword] = useState(false);

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
            type={showPassword ? "text" : "password"}
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

              ${Icon ? "pl-12" : "pl-4"}
              pr-14

              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-white/10 focus:border-orange-500 focus:ring-orange-500/10"
              }

              ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }

              focus:ring-4

              ${className}
            `}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? (
              <HiEyeSlash className="h-5 w-5" />
            ) : (
              <HiEye className="h-5 w-5" />
            )}
          </button>
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;