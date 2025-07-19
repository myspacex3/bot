import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ScrollArea } from './ui/scroll-area'
import { MessageBubble } from './MessageBubble'
import { Message } from '../types'

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isGenerating: boolean
}

export function ChatInterface({ messages, onSendMessage, isGenerating }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">v0</span>
            </div>
            <h1 className="text-2xl font-semibold">What can I help you build?</h1>
            <p className="text-muted-foreground">
              Describe the UI component you want to create and I'll generate the code for you.
            </p>
            <div className="grid grid-cols-1 gap-2 mt-6">
              {[
                'Create a modern button component',
                'Build a pricing card with features',
                'Design a navigation header',
                'Make a contact form with validation'
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className="p-3 text-left border border-border rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isGenerating && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating component...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the component you want to build..."
            className="flex-1 min-h-[60px] max-h-[200px] resize-none"
            disabled={isGenerating}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="self-end"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}