import { useState } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, Plus, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Message } from '../types'
import { cn } from '../lib/utils'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  messages: Message[]
}

export function Sidebar({ isOpen, onToggle, messages }: SidebarProps) {
  const [conversations] = useState([
    { id: '1', title: 'Landing page design', timestamp: '2 hours ago' },
    { id: '2', title: 'Dashboard components', timestamp: '1 day ago' },
    { id: '3', title: 'E-commerce product card', timestamp: '3 days ago' },
  ])

  return (
    <div className={cn(
      "border-r border-border bg-background transition-all duration-300",
      isOpen ? "w-64" : "w-12"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-3">
          {isOpen && (
            <Button variant="outline" size="sm" className="flex-1 mr-2">
              <Plus className="h-4 w-4 mr-2" />
              New chat
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="shrink-0"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isOpen && (
          <>
            <Separator />
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-2 py-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Recent
                </div>
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  )
}