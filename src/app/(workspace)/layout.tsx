import React from 'react'
import { childrenProps } from '../(auth)/layout'
import { Header } from '@/modules/layout/components/header'
import { currentUser } from '@/modules/authentication/actions'
import { initilizeWorkspace } from '@/modules/workspaces/action'

const RootLayout =async ({ children }: childrenProps) => {
    const workspace = await initilizeWorkspace()
    const user = await currentUser();
    console.log("mark 1",workspace)
    return (
        <>
            {/* Header */}
            {/* @ts-ignore */}
            <Header user={user}/>
            <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden'>
                <div className='flex h-full w-full'>
                    <div className='w-12 border-zinc-800 bg-zinc-900'>
                        tableft panel
                    </div>
                    <div className='flex-1 bg-zinc-900'>
                        {children}
                    </div>
                    
                </div>
            </main>
        </>
    )
}

export default RootLayout
