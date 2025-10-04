import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import {addRequestToCollections,deleteRequestWithId,getAllRequestFromCollection,saveRequest, type Request} from "../actions"


export const useAddRequestToCollection = (collectionId:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (value:any) => addRequestToCollections(collectionId, value),
        onSuccess :() => {
            queryClient.invalidateQueries({ queryKey: ['requests', collectionId] })
        }
    }) 
}

export const useGetAllRequestsFromCollection = (collectionId:string) => {
    
    return useQuery({
        queryKey: ['requests', collectionId],
        queryFn:() => getAllRequestFromCollection(collectionId),
        enabled: !!collectionId
    })
}



export const useSaveRequest =  (id:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async (value:Request) => saveRequest(id, value),
        onSuccess :(data) => {
            queryClient.invalidateQueries({ queryKey: ['requests'] })
            console.log(data)
        }   
    })
}

export const useDeleteRequest = (collectionId:string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async (id:string) => deleteRequestWithId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["requests",collectionId]})
        }
    })


}

