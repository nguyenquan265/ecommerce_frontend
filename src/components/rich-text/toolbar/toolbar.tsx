import React from 'react'
import { ToggleGroup as ToggleGroupPrimitive, Toolbar as ToolbarPrimitive } from '@radix-ui/react-toolbar'

import { cn } from '@/lib/utils'

interface ToolbarProps {
  children: React.ReactNode
  className?: string
}

const Toolbar = ({ children, className }: ToolbarProps) => {
  return (
    <ToolbarPrimitive
      className={cn(
        'sticky inset-x-0 top-0 z-50 my-2 rounded-sm bg-secondary/40 px-4 py-2 backdrop-blur-lg',
        className
      )}
    >
      {children}
    </ToolbarPrimitive>
  )
}

const ToggleGroup = ToggleGroupPrimitive

ToggleGroup.displayName = ToggleGroupPrimitive.displayName

export { Toolbar, ToggleGroup }
