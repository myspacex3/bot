import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ChatInterface } from './components/ChatInterface'
import { PreviewPanel } from './components/PreviewPanel'
import { Message } from './types'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    // Simulate AI response with code generation
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'll create a ${content.toLowerCase()} component for you.`,
        timestamp: new Date(),
        code: generateSampleCode(content)
      }

      setMessages(prev => [...prev, aiMessage])
      setGeneratedCode(aiMessage.code || '')
      setIsGenerating(false)
    }, 2000)
  }

  const generateSampleCode = (prompt: string): string => {
    // Simple code generation based on prompt
    if (prompt.toLowerCase().includes('button')) {
      return `import React from 'react'

export default function Button() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Click me
    </button>
  )
}`
    }

    if (prompt.toLowerCase().includes('card')) {
      return `import React from 'react'

export default function Card() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Card Title</h2>
        <p className="text-gray-600">This is a beautiful card component with a clean design.</p>
      </div>
    </div>
  )
}`
    }

    return `import React from 'react'

export default function Component() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generated Component</h1>
      <p className="text-gray-600">This component was generated based on your prompt: "${prompt}"</p>
    </div>
  )
}`
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          messages={messages}
        />
        <div className="flex flex-1">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
          />
          <PreviewPanel code={generatedCode} />
        </div>
      </div>
    </div>
  )
}

export default App