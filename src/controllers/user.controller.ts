import type {Request, Response} from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services/user.service.js'

const createUserHandler =async(req:Request,res:Response)=>{
    try{
            const data = req.body

            const userCreated = await createUser(data)
            
            return res.status(201).json(userCreated)

    }catch(error){
        console.log(error)
    }

}

const getUsersHandler = async (req:Request,res:Response)=>{
    
    try{

        const users = await getUsers()

        return res.status(200).json(users)
    }catch(err){
        console.log(err)
    }
}

const getUserHandler = async(req:Request,res:Response)=>{
    try{
        const userId  = req.params.userId

        const user = await getUser(userId as string)

        return res.status(200).json(user)
    }catch(err){

    }

}

const updateUserHandler = async (req:Request,res:Response)=>{
    const userId = req.params.userId
    const userData = req.body

    const updatedUser = await updateUser(userId as string,userData)
    
    return res.status(200).json(updatedUser)
}

const deleteUserHandler = async (req:Request,res:Response)=>{
    const userId = req.params.userId

    const deletedUser = await deleteUser(userId as string)


    return res.status(200).json(deletedUser)
}

export {createUserHandler,getUsersHandler ,getUserHandler,updateUserHandler,deleteUserHandler}