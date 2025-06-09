export const showToast = (message, type = "success", duration = 3000) => {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".message-toast")
  existingToasts.forEach((toast) => toast.remove())

  // Create new toast
  const toast = document.createElement("div")
  toast.className = `message-toast ${type}`
  toast.textContent = message

  document.body.appendChild(toast)

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, duration)
}

export const showSuccess = (message) => showToast(message, "success")
export const showError = (message) => showToast(message, "error")
