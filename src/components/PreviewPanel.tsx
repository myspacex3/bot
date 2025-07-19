import { useState } from 'react'
import { Eye, Code, Smartphone, Monitor, Tablet } from 'lucide-react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { cn } from '../lib/utils'

interface PreviewPanelProps {
  code: string
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState('preview')

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm'
      case 'tablet':
        return 'max-w-2xl'
      default:
        return 'w-full'
    }
  }

  // Simple component renderer (in a real app, you'd use a proper sandbox)
  const renderPreview = () => {
    if (!code) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Preview will appear here</p>
          </div>
        </div>
      )
    }

    // This is a simplified preview - in production you'd use a proper sandbox
    return (
      <div className="p-8 bg-white min-h-full">
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-600">
            <p className="mb-2">Component Preview</p>
            <p className="text-sm text-gray-500">
              In a real implementation, the generated component would render here
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!code) {
    return (
      <div className="w-1/2 border-l border-border bg-muted/20 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Start a conversation to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-1/2 border-l border-border flex flex-col">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab === 'preview' && (
            <div className="flex items-center space-x-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'preview' ? (
          <div className="p-4 h-full">
            <div className={cn('mx-auto h-full transition-all duration-300', getPreviewWidth())}>
              {renderPreview()}
            </div>
          </div>
        ) : (
          <div className="h-full">
            <pre className="p-4 text-sm overflow-auto h-full bg-muted">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}