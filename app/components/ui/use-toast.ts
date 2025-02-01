import { toast as hotToast } from "react-hot-toast"

export const toast = {
  ...hotToast,
  title: (title: string) => hotToast(title),
  description: (description: string) => hotToast(description),
  variant: (variant: string) =>
    ({
      success: () => hotToast.success,
      error: () => hotToast.error,
      destructive: () => hotToast.error,
    })[variant] || hotToast,
}

