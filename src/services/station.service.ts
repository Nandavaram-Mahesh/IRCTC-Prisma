import { prisma } from "../prisma/client.js"
import { Prisma } from "../generated/prisma/client.js";

const seedStations = async(stations:any)=>{

    const result = await prisma.station.createMany({
        data: stations,
        skipDuplicates: true // avoids crash on re-run
    });

    return result

}

const getStations=async(search:string,statioName:string,statioCode:string)=>{

    // If user types "CHE" → matches code like CHE

    // If user types "Chennai" → matches name

    // If it matches both → returns both

    // 👉 This is called:

    // "Global search" / "fuzzy search"

    const where:Prisma.StationWhereInput = {
        AND:[search ? {
                OR:[
                    {name:{ contains: search, mode: Prisma.QueryMode.insensitive }},
                    {code:{ contains: search, mode: Prisma.QueryMode.insensitive }}
                ]
                }:{},
            statioName ? { name: { contains: statioName, mode: Prisma.QueryMode.insensitive } } : {},
            statioCode ? {code:{ contains: statioCode, mode: Prisma.QueryMode.insensitive }}:{}
]
}
    
    const stations = await prisma.station.findMany({where})

    return stations

}

const getStation = async(stationCode:string)=>{
    const station = await prisma.station.findUnique({
        where:{code:stationCode}
    })

    return station
}
export {seedStations,getStations,getStation}