"use client";


import Modal from "@/components/ui/model";
import React from "react";
import { toast } from "sonner";
import { useDeleteCollection } from "../hooks/collection";

const DeleteCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  workspaceId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  workspaceId: string;
}) => {
  const { mutateAsync, isPending } = useDeleteCollection(workspaceId);

  const handleDelete = async () => {
    try {
      await mutateAsync(collectionId);
      toast.success("Collection deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete collection");
      console.error("Failed to delete collection:", err);
    }
  };

  return (
    <Modal
      title="Delete Collection"
      description="Are you sure you want to delete this collection? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all requests and data in this collection will be permanently removed.
      </p>
    </Modal>
  );
};

export default DeleteCollectionModal;