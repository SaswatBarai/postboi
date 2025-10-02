import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query"
import { createWorksapce,getWorkspaces ,getWorkspacesById} from "../action"
 

export function useWorkspace(){
    return useQuery({
        queryKey : ["workspaces"],
        queryFn : getWorkspaces,
        // staleTime:1000*60*5 //5 minutes
    })
}

export function useCraeteWorkspace(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(name:string) => createWorksapce(name),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        }
    })
}

export function useWorkspaceById(id:string){

    return useQuery({
        queryKey : ["workspaces",id],
        queryFn:async () => getWorkspacesById(id)
    })
}