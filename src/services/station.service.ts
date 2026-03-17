import { prisma } from "../prisma/client.js"

const seedStations = async(stations:any)=>{

    const result = await prisma.station.createMany({
        data: stations,
        skipDuplicates: true // avoids crash on re-run
    });

    return result

}

const getStations=async()=>{
    const stations = await prisma.station.findMany()

    return stations

}

const getStation = async(stationCode:string)=>{
    const station = await prisma.station.findUnique({
        where:{code:stationCode}
    })

    return station
}
export {seedStations,getStations,getStation}