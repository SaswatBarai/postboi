"use client"


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import TabbedSidebar from "@/modules/collections/components/sidebar"

import {useWorkspaceStore} from "@/modules/layout/store"
import {useWorkspaceById} from "@/modules/workspaces/hooks/workspace"
import { Loader } from "lucide-react"


const Page = () => {

  const {selectedWorkspace} = useWorkspaceStore();
  const {data:currentWorkspace,isPending} = useWorkspaceById(selectedWorkspace?.id || "")

  if(isPending){
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin h-6 w-6 text-indigo-500"/>
      </div>
    )
  }

  if(!currentWorkspace){
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>No workspace selected</p>
      </div>
    )
  }
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-full p-4">
            <h1>Request playground</h1>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} maxSize={40} minSize={25}>
          <TabbedSidebar currentWorkspace={currentWorkspace}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Page