import React, { use, useState } from 'react'
import { useColllections } from '../hooks/collection';
import { Archive, Clock, Code, ExternalLink, HelpCircle, icons, Loader, Plus, Search, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateCollection from './create-collection';
import EmptyCollections from './empty-collections';
import CollectionFolder from './collection-folder';

interface Props {
  currentWorkspace: {
    id: string,
    name: string
  }
}

const TabbedSidebar = ({ currentWorkspace }: Props) => {
  const [activeTab, setActiveTab] = useState("Collections")
  const [isModelOpen, setIsModalOpen] = useState(false);
  const { data: collections, isPending } = useColllections(currentWorkspace?.id);

  if (isPending) {
    return <div className='flex-1 flex items-center justify-center bg-zinc-900'>
      <Loader className='w-6 h-6 text-orange-500 animate-spin' />
    </div>
  }

  const sidebartItems = [
    { icon: Archive, label: "Collections" },
    { icon: Clock, label: "History" },
    { icon: Share2, label: "Shared with me" },
    { icon: Code, label: "Code" },
  ]

  return (
    <div className='flex h-full bg-zinc-900'>
      {/* Left Icon Sidebar */}
      <div className='w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4'>
        {sidebartItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${activeTab === item?.label ?
              'bg-indigo-500 text-white' :
              'text-zinc-400 hover:bg-zinc-800'
              }`}
          >
            <item.icon className='w-4 h-4' />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className='flex-1 bg-zinc-900'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-3 border-b border-zinc-800'>
          <div className='flex items-center space-x-3'>

            <span className='text-zinc-500 font-medium'>{currentWorkspace?.name}</span>
            <span className='text-zinc-400'>•</span>
            <span className='text-zinc-200 font-medium'>Collections</span>
          </div>
          <div className='flex items-center space-x-2'>
            <HelpCircle className='w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer' />
            <ExternalLink className='w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer' />
          </div>
        </div>

        {/* Collections Content */}
        <div className='flex-1 overflow-y-auto'>
          <div className='relative p-4 border-b border-zinc-800 '>
            <Search
              className='absolute left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400'
            />
            <input type="text"
              placeholder='Search'
              className='w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline focus:ring-2 focus:ring-indigo-500 focus:border-transparent '
            />
          </div>

          <CreateCollection
            isModalOpen={isModelOpen}
            setIsModalOpen={setIsModalOpen}
            workspaceId={currentWorkspace.id}
          />

          <div className='p-4 border-b border-zinc-800'>
            <Button
              variant={"ghost"}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className='w-4 h-4' />
              <span className='text-sm font-medium'>New</span>

            </Button>

          </div>

          <div >
            {collections && collections.length > 0 &&collections?.map((collection: any) => (
              <div className='flex flex-col justify-start p-3 item-start border-b border-zinc-800 w-full' key={collection.id}>
                <CollectionFolder collection={collection} />
              </div>
            ))}
            {

              collections && collections.length === 0 && (
                <>
                <EmptyCollections/>
                </>
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default TabbedSidebar
