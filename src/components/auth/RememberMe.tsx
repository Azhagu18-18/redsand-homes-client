"use client";

import { ChangeEvent, memo } from "react";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}

function RememberMe({
  checked,
  onChange,
  id = "remember-me",
  disabled = false,
}: RememberMeProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        name="rememberMe"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-describedby={`${id}-description`}
        className="
          h-4
          w-4
          cursor-pointer
          rounded
          border
          border-white/20
          bg-zinc-900
          text-orange-500
          accent-orange-500
          transition
          focus:ring-2
          focus:ring-orange-500
          focus:ring-offset-0
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />

      <label
        htmlFor={id}
        className="
          cursor-pointer
          select-none
          text-sm
          text-zinc-300
          transition-colors
          hover:text-white
        "
      >
        Remember me
      </label>

      <span id={`${id}-description`} className="sr-only">
        Keep me signed in on this device.
      </span>
    </div>
  );
}

export default memo(RememberMe);