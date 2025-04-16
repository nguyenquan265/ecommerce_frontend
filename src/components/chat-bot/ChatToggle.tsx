import { CuboidIcon as Cube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ChatToggleProps {
  onClick: () => void
}

const ChatToggle = ({ onClick }: ChatToggleProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Responsive sizing based on screen size
  const buttonSize = isMobile ? 'h-12 w-12' : 'h-14 w-14'
  const iconSize = isMobile ? 'h-5 w-5' : 'h-6 w-6'

  return (
    <Button
      onClick={onClick}
      size='icon'
      className={`${buttonSize} rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200`}
    >
      <Cube className={`${iconSize} text-white`} fill='#f97316' />
    </Button>
  )
}

export default ChatToggle
