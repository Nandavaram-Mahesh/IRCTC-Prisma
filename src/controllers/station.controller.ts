import type {Request,Response,NextFunction} from 'express'
import { seedStations,getStations,getStation } from '../services/station.service.js'

const seedStationsHandler = async(req:Request,res:Response)=>{
    const stations = req.body

    const createdStations = await seedStations(stations)
    
    return res.status(201).json(createdStations)

}
const getStationsHandler =async (req:Request,res:Response)=>{

    const seededStations = await getStations()

    return res.status(200).json(seededStations)

}
const getStaionHandler = async (req:Request,res:Response)=>{

    const stationCode = req.params.stationCode

    const station = await getStation(stationCode as string)

    return res.status(200).json(station)

}

export{seedStationsHandler,getStationsHandler,getStaionHandler}   