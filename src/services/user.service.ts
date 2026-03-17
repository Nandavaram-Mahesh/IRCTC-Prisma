import { prisma } from "../prisma/client.js"

const createUser = async(data:any)=>{
    const {name,email,password} = data
    
    const createdUser = await prisma.user.create({
                data:{name,email,password}
            })
    return createdUser
}

const getUsers = async()=>{
    const users = await prisma.user.findMany()
    return users
}

const getUser = async(userId:string)=>{
    const user = await prisma.user.findUnique({
            where:{id:userId as string}
        })
}

const updateUser = async(userId:string,userData:any)=>{
    
    const userUpdated = await prisma.user.update({
            where: {
                id:userId as string
            },
            data: {
                ...userData
            }
        })
    return userUpdated
}


const deleteUser = async (userId:string)=>{
    
    const deletedUser = await prisma.user.delete({
        where: {
            id:userId as string
        }
    })
    return deletedUser;
}

export {createUser,getUsers,getUser,updateUser,deleteUser}