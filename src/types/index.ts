export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  code?: string
}

export interface CodeBlock {
  language: string
  code: string
}

export interface GeneratedComponent {
  id: string
  name: string
  code: string
  preview: string
  timestamp: Date
}