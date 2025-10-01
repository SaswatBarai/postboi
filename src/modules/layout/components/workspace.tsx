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

export const Workspace = () => {
  return (
    <Hint label='Change Workspace'>
      <Select>
        <Button className='border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1'>
          <User className='size-4 text-indigo-400' />
          <span className='text-sm text-indigo-400 font-semibold'>
            Personal Workspace
          </span>
        </Button>
      </Select>
    </Hint>
  )
}

export default Workspace
