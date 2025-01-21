// navigationHelper.ts
import { router } from '../App'

// A function to navigate to a specific path
export function navigateTo(path: string) {
  router.navigate(path)
}

// Optional: Add a function to navigate back
export function navigateBack() {
  router.navigate(-1)
}

// Optional: Add a function to navigate forward
export function navigateForward() {
  router.navigate(1)
}
