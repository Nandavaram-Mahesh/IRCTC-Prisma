import type { Response } from "express";

const successResponse = (res:Response,status:Number,msg:string,error:any,data:any)=>{
     return res.status(200).json({
        success:true,
        message:'Fetched stations successfully',
        error,
        data
        });
}

export {successResponse}