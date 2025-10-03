import Modal from '@/components/ui/model'
import React from 'react'
import { useCreateCollection } from '../hooks/collection'
import { toast } from 'sonner'

const CreateCollection = ({ workspaceId, isModalOpen, setIsModalOpen }: {
    workspaceId: string,
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void
}) => {
    const [name, setName] = React.useState("")
    const { mutateAsync, isPending } = useCreateCollection(workspaceId, name)


    const handleSubmit = async () => {
        if (!name.trim()) return;
        try {
            // pass the name to the mutation (mutationFn expects the name argument)
            await mutateAsync(name);
            setIsModalOpen(false);
            setName("")
        } catch (error) {
            toast.error("Failed to create collection")
            console.error("Error creating collection:", error);
        }
    }
    return (
        <div>
            <Modal
                title='Add New Collection'
                description='Add a new collection to organize your requests'
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                submitText={isPending ? 'Creating...' : 'Create Collection'}
                submitVariant='default'
            >
                <div className='space-y-4'>
                    <input
                        type="text"
                        className='w-full p-2 border rounded'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </Modal>

        </div>
    )
}

export default CreateCollection
