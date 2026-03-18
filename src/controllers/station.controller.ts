import type {Request,Response,NextFunction} from 'express'
import { seedStations,getStations,getStation } from '../services/station.service.js'

const seedStationsHandler = async(req:Request,res:Response)=>{
    const stations = req.body

    const createdStations = await seedStations(stations)
    
    return res.status(201).json(createdStations)

}
const getStationsHandler =async (req:Request,res:Response)=>{
    const {search, stationName , stationCode , page ,limit} = req.query;


    const {stations,totalCount} = await getStations(search as string , stationName as string , stationCode as string, page as string,limit as string )

    return res.json({
        data: stations,
        meta: {
            totalCount,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(totalCount / Number(limit))
        }
        });

}
const getStaionHandler = async (req:Request,res:Response)=>{

    const stationCode = req.params.stationCode

    const station = await getStation(stationCode as string)

    return res.status(200).json(station)

}

export{seedStationsHandler,getStationsHandler,getStaionHandler}   