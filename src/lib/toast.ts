// src/lib/toast.ts

import { toast } from "sonner";

const DEFAULT_DURATION = 3000;

export const toastHelper = {
  success: (message: string) =>
    toast.success(message, {
      duration: DEFAULT_DURATION,
    }),

  error: (message: string) =>
    toast.error(message, {
      duration: DEFAULT_DURATION + 1000,
    }),

  warning: (message: string) =>
    toast.warning(message, {
      duration: DEFAULT_DURATION,
    }),

  info: (message: string) =>
    toast.info(message, {
      duration: DEFAULT_DURATION,
    }),

  loading: (message: string) =>
    toast.loading(message),

  dismiss: (toastId?: string | number) =>
    toast.dismiss(toastId),
};

export default toastHelper;