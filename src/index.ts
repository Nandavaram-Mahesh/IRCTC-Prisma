
import express from 'express';

import {router as userRoute} from './routes/user.route.js'
import {router as stationRoute} from './routes/station.route.js';



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoute)
app.use('/stations',stationRoute)

app.listen(3000,()=>console.log('The server is running on http://localhost:3000'))