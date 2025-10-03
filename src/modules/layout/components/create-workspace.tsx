"use client"

import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/model"
import { useCreateWorkspace } from "@/modules/workspaces/hooks/workspace"
import React, { useState } from 'react'
import { toast } from "sonner"



export const CreateWorkSpace = ({ isModelOpen, setIsModelOpen }: {
    isModelOpen: boolean;
    setIsModelOpen: (open: boolean) => void
}) => {
    const [name, setName] = useState("")
    const {mutateAsync,isPending} = useCreateWorkspace();
    const handleSubmit = async () => {
        if(name.trim().length === 0) return;
        try {
            await mutateAsync(name)
            toast.success("Workspace created successfully")
            setIsModelOpen(false)
            setName("")
        } catch (error) {
            toast.error("Failed to create workspace")
            console.log(error);
        }
    }


    return (
        <Modal
        title="Add New Workspace"
        description="Create a new workspace to organize your project"
        onClose={() => setIsModelOpen(false)}
        isOpen={isModelOpen}
        onSubmit={handleSubmit}
        submitText={isPending ? "Creating..." : "Create Workspace"}
        submitVariant="default"
        >
            <div className="space-y-4">
                <Input
                placeholder="Workspace Name"
                className="w-full p-2 border rounded-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    )
}