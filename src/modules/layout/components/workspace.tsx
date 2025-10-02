"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader, Plus, User } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from "@/components/ui/separator"
import { Hint } from '@/components/ui/hint'
import { useWorkspace } from '@/modules/workspaces/hooks/workspace'
import { useWorkspaceStore } from '../store'
import { CreateWorkSpace } from './create-workspace'

export const Workspace = () => {

  const [isModelOpen, setModelOpen] = useState(false)
  const { data: workspaces, isLoading, } = useWorkspace();

  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0])
    }
  }, [workspaces, selectedWorkspace, setSelectedWorkspace])

  if (isLoading) {
    <Loader className='animate-spin size-4 text-indigo-400' />
  }

  if (workspaces && workspaces.length == 0) {
    return <div className='font-semibold text-indigo-400'>No Workspace Found </div>
  }
  return (
    <>
      <Hint label='Change Workspace'>
        <Select
          value={selectedWorkspace?.id}
          onValueChange={(id) => {
            const workspace = workspaces?.find(ws => ws.id === id);
            if (workspace) {
              setSelectedWorkspace(workspace);
            }
          }}
        >
          <SelectTrigger className='border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1'>
            <User className="size-4 text-indigo-400" />
            <span className="text-sm text-indigo-400 font-semibold">
              <SelectValue placeholder="Select workspace" />
            </span>
          </SelectTrigger>

          <SelectContent>
            {workspaces?.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}

            <Separator className='my-1' />
            <div className='p-2 flex flex-row justify-between items-center '>
              <span className='text-sm font-semibold flex gap-3 justify-center items-center text-zinc-600'>
                My Workspaces
                <Button size={"icon"} variant={"outline"} onClick={() => setModelOpen(true)}>
                  <Plus size={16} className='text-indigo-400' />
                </Button>
              </span>
            </div>
          </SelectContent>


        </Select>
      </Hint>
      <CreateWorkSpace isModelOpen={isModelOpen} setIsModelOpen={setModelOpen}/>
    </>
  )
}

export default Workspace
