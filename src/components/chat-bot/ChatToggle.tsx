import { CuboidIcon as Cube } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatToggleProps {
  onClick: () => void
}

const ChatToggle = ({ onClick }: ChatToggleProps) => {
  return (
    <Button
      onClick={onClick}
      size='icon'
      className='h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200'
    >
      <Cube className='h-6 w-6 text-white' fill='#f97316' />
    </Button>
  )
}

export default ChatToggle
