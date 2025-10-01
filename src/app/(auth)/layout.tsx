import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export type childrenProps = {
    children : ReactNode
}
const AuthLayout = async ({children}:childrenProps) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(session){
        return redirect("/")
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout
