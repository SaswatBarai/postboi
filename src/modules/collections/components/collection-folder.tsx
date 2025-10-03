import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, Edit, EllipsisVertical, FilePlus, Folder, Trash } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCollectionModal from './edit-collection-modal';
import DeleteCollectionModal from './delete-collection-modal';

interface Props{
  collection:{
    id:string,
    name:string
    updatedAt:Date
    workspaceId:string
  }
}


const CollectionFolder = ({collection}:Props) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [isAddRequestOpen, setIsAddRequestOpen] = React.useState(false)
    const [isEditOpen, setIsEditOpen] = React.useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
    return (
    <div>
      <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className='w-full'
      >
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center p-2 flex-1 w-full hover:bg-zinc-900 rounded-md'>
                 <CollapsibleTrigger className="flex flex-row justify-start items-center space-x-2 flex-1">
              <div className="flex items-center space-x-1">
                {/* {hasRequests ? ( */}
                 { isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  )}
                {/* ) : ( */}
                  {/* <div className="w-4 h-4" /> // Spacer when no requests
                )} */}
                <Folder className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-zinc-200 capitalize">
                  {collection.name}
                </span>
                {/* removed accidental recursive render */}
              </div>
            </CollapsibleTrigger>

            <div className='flex flex-row justify-center items-center space-x-2' >
                <FilePlus
                className='h-4 w-4 text-zinc-400 hover:text-indigo-400 cursor-pointer'
                />
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-zinc-800 rounded">
                    <EllipsisVertical className="w-4 h-4 text-zinc-400 hover:text-indigo-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => setIsAddRequestOpen(true)}>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <FilePlus className="text-green-400 mr-2 w-4 h-4" />
                        Add Request
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘R
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Edit className="text-blue-400 mr-2 w-4 h-4" />
                        Edit
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘E
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Trash className="text-red-400 mr-2 w-4 h-4" />
                        Delete
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘D
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            </div>

        </div>
      </Collapsible>
      <EditCollectionModal
      isModalOpen= {isEditOpen}
      setIsModalOpen= {setIsEditOpen}
      collectionId = {collection?.id}
      initialName = {collection?.name}
      />

      <DeleteCollectionModal
      isModalOpen= {isDeleteOpen}
      setIsModalOpen= {setIsDeleteOpen}
      collectionId = {collection?.id}
      workspaceId = {collection?.workspaceId}
      />
    </div>
  )
}

export default CollectionFolder
