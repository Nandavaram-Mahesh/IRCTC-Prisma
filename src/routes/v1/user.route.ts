import express from 'express'
import { createUserHandler,deleteUserHandler,getUserHandler,getUsersHandler, updateUserHandler } from '../../controllers/user.controller.js'


const router = express.Router()



router.post('/',createUserHandler)

router.get('/',getUsersHandler)
router.get('/:userId',getUserHandler)

router.patch('/:userId',updateUserHandler)

router.delete('/:userId',deleteUserHandler)

export default router