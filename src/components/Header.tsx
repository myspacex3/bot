import { Menu, Settings, User } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">v0</span>
            </div>
            <span className="font-semibold text-lg">v0</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
              by Vercel
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}