"use server"

import db from "@/lib/db"
import { currentUser } from "@/modules/authentication/actions"
import { MEMBERROLE } from "@/generated/prisma"


export const initilizeWorkspace = async () => {
    const user = await currentUser();

    if(!user){
        return {
            success:false,
            message:"user not found"
        }
    }

    try {
        const workspace =  await db.workspace.upsert({
            where:{
                ownerId_name:{
                    ownerId:user.id,
                    name:"Personal"
                }
            },
            update:{},
            create:{
                name:"Personal",
                ownerId:user.id,
                description:"Default workspace for personal use",
                members:{
                    create:{
                        userId:user.id,
                        role:MEMBERROLE.ADMIN

                    }
                }
            },
            include:{
                members:true
            }
        })

        return {
            success: true,
            message: "Workspace initialized successfully",
            workspace
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to initialize workspace"
        }
    }
}


export async function  getWorkspaces() {
    const user = await currentUser();
    if(!user){
        throw new Error("Unauthorized")
    }
    const workspaces = await db.workspace.findMany({
        where:{
            OR:[
                {ownerId:user.id},
                {members:{some:{userId:user.id}}}
            ]
        },
        orderBy:{createdAt:"asc"}
    })

    return workspaces
}


export async function createWorksapce(name:string) {
    const user = await currentUser();

    if(!user) {
        throw new Error("Unauthorized")
    }

    const workspace = await db.workspace.create({
        data:{
            name,
            ownerId:user.id,
            members:{
                create:{
                    userId:user.id,
                    role:MEMBERROLE.ADMIN
                }
            }
        }
    })

    return workspace;
}


export async function getWorkspacesById(id:string) {
    const workspace = await db.workspace.findUnique({
        where:{id},
        include:{
            members:true
        }
    })

    return workspace;
}

