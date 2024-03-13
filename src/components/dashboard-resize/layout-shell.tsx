"use client"

import * as React from "react"

// UI
import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { settingsLinks, storeBackend } from "@/app/(dashboard)/_config"

import { AccountSwitcher } from "./acc-switcher"
import { Nav } from "./nav-simple"

interface DashboardProps {
  accounts: {
    label: string
    workspace: string
    icon: React.ReactNode
  }[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  defaultLeftPanel?: boolean
  navCollapsedSize: number
  children: React.ReactNode
  leftPanelContent?: React.ReactNode
}

export function ResizableDashLayout({
  accounts,
  // data,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  defaultLeftPanel = false,
  navCollapsedSize,
  children,
  leftPanelContent,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [showLeftPanel, setShowLeftPanel] = React.useState(defaultLeftPanel)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className="h-full min-h-[calc(100dvh-1rem)] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          {/* Sidebar */}
          <div
            className={cn(
              "relative flex h-[60px] items-center justify-center",
              isCollapsed ? "h-[60px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />

          <div className="flex flex-col h-[100vh] justify-between">
            <Nav isCollapsed={isCollapsed} links={storeBackend as []} />
            <div className="justify-end pb-20">
              <Separator />
              <Nav isCollapsed={isCollapsed} links={settingsLinks as []} />
            </div>
          </div>

          {/* <div className="ml-4">
            <ModeToggle />
          </div> */}
        </ResizablePanel>
        {/* Sidebar Handle */}
        <ResizableHandle withHandle />

        {/* Main Panel */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
        {/* Main Panel Handle */}

        {/* Conditionally Render Left Panel */}
        {showLeftPanel && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
              {leftPanelContent && leftPanelContent}
            </ResizablePanel>
          </>
        )}
        {/* End of Left Panel */}
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
