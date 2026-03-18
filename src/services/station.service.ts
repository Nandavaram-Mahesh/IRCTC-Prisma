import { prisma } from "../prisma/client.js"
import { Prisma } from "../generated/prisma/client.js";

const seedStations = async(stations:any)=>{

    const result = await prisma.station.createMany({
        data: stations,
        skipDuplicates: true // avoids crash on re-run
    });

    return result

}

const getStations=async(search:string,statioName:string,statioCode:string,page:string,limit:string)=>{

    // If user types "CHE" → matches code like CHE

    // If user types "Chennai" → matches name

    // If it matches both → returns both

    // 👉 This is called:

    // "Global search" / "fuzzy search"


    // 🧠 Mental Model (REMEMBER THIS)
    // 1. WHERE → filter/search
    // 2. ORDER → sort
    // 3. SKIP → jump
    // 4. TAKE → limit

    const pageNum = Number(page)|| 1
    const limitNum  = Number(limit) || 10

    const skip = (pageNum - 1) * limitNum;


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


    
    const [stations,totalCount] = await prisma.$transaction([
        prisma.station.findMany({
            where,
            orderBy: { name: "asc" },
            skip,       // 📄 then paginate
            take: limitNum
        }),
        prisma.station.count({where})
    ]);
        

    return { stations, totalCount }

}

const getStation = async(stationCode:string)=>{
    const station = await prisma.station.findUnique({
        where:{code:stationCode}
    })

    return station
}
export {seedStations,getStations,getStation}