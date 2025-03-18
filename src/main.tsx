import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ThemeProvider } from './providers/ThemeProvider.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5
    }
  }
})

createRoot(document.getElementById('root')!).render(
  // <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </ThemeProvider>
)
