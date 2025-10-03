import {useQuery , useMutation, useQueryClient} from "@tanstack/react-query"
import { createCollection,deleteCollection,editCollection,getCollectionsByWorkspaceId } from "../action" 

export const useColllections = (workspaceId:string) => {
    return useQuery({
        queryKey: ['collections', workspaceId],
        queryFn: () => getCollectionsByWorkspaceId(workspaceId),
        enabled: !!workspaceId
    })
}


export const useCreateCollection = (workspaceId:string, name:string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-collection', workspaceId],
        mutationFn: async (name:string) => createCollection(workspaceId, name),
        onSuccess :() => {
            queryClient.invalidateQueries({ queryKey: ['collections', workspaceId] })
        }
    })
}

export const useDeleteCollection = (workspaceId:string) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ['delete-collection', workspaceId],
        mutationFn: async (collectionId:string) => deleteCollection(collectionId),
        onSuccess :() => {
            queryClient.invalidateQueries({ queryKey: ['collections', workspaceId] })
        }
    })
}


export const useEditCollection = (collectionId:string,name:string) => {
     const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['edit-collection', collectionId],
        mutationFn: async (name:string) => editCollection(collectionId, name),
        onSuccess :() => {
            queryClient.invalidateQueries({ queryKey: ['collections'] })
        }
    })
}