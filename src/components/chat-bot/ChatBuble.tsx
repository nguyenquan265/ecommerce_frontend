import { useEffect, useRef } from 'react'

interface ChatBubbleProps {
  message: {
    id: string
    text: string
    sender: 'user' | 'bot'
  }
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isBot = message.sender === 'bot'
  const bubbleRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [message.text])

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`} ref={bubbleRef}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${isBot ? 'bg-gray-100 text-blue-600' : 'bg-blue-600 text-white'}`}
      >
        {message.text === 'Đang suy nghĩ...' ? (
          <div className='flex items-center space-x-1'>
            <div className='h-2 w-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
            <div className='h-2 w-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
            <div className='h-2 w-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          message.text
        )}
      </div>
    </div>
  )
}

export default ChatBubble
