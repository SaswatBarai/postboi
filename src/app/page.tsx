import { Button } from '@/components/ui/button'
import { currentUser } from '@/modules/authentication/actions'
import UserButton from '@/modules/authentication/components/user-button';
import React from 'react'

const Home = async () => {
  const user = await currentUser();
  return (
    <div>
      <div className='flex h-screen flex-col items-center justify-center'>
       <UserButton user={user}/>
      </div>
    </div>
  )
}

export default Home
