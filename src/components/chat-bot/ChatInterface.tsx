import { useState, useEffect, useRef } from 'react'

import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import ChatBubble from './ChatBuble'
import ChatToggle from './ChatToggle'

import { getGeminiResponse } from '@/lib/gemini'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
}

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Chào mừng bạn! Tôi là Plus_House_Bot, tôi có thể giúp gì cho bạn?',
      sender: 'bot'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Add loading message
      const loadingId = (Date.now() + 1).toString()
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          text: 'Đang suy nghĩ...',
          sender: 'bot'
        }
      ])

      // Get response from Gemini AI
      const response = await getGeminiResponse(userMessage.text)

      // Replace loading message with actual response
      setMessages((prev) => prev.map((msg) => (msg.id === loadingId ? { ...msg, text: response.text } : msg)))
    } catch (error) {
      console.error('Error in chat flow:', error)

      // Add error message
      setMessages((prev) => {
        // Find and remove the loading message if it exists
        const withoutLoading = prev.filter((msg) => msg.text !== 'Đang suy nghĩ...')

        return [
          ...withoutLoading,
          {
            id: (Date.now() + 2).toString(),
            text: 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.',
            sender: 'bot'
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className='fixed bottom-4 right-4 md:right-8 z-50 flex flex-col items-end'>
      {isOpen && (
        <div className='flex flex-col w-[90vw] sm:w-[350px] h-[450px] bg-white rounded-lg shadow-lg overflow-hidden mb-4 transition-all'>
          {/* Header */}
          <div className='bg-blue-600 text-white p-3 font-medium'>Plus_House_Bot</div>

          {/* Chat area */}
          <div ref={chatAreaRef} className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className='border-t border-gray-200 p-3 flex items-center'>
            <Input
              placeholder='Ask something...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className='flex-1'
              disabled={isLoading}
            />
            <Button
              size='icon'
              className='ml-2 bg-blue-600 hover:bg-blue-700 rounded-full'
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}

      <div className='self-end'>
        <ChatToggle onClick={toggleChat} />
      </div>
    </div>
  )
}

export default ChatInterface
