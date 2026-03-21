import express from 'express'
import { getStationsHandler, seedStationsHandler,getStaionHandler } from '../../controllers/station.controller.js'


const router = express.Router()


router.get('/',getStationsHandler)
router.get('/:stationCode',getStaionHandler)
router.post('/bulk',seedStationsHandler)

export default router
