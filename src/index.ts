
import express from 'express';
import router from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',router)


app.listen(3000,()=>console.log('The server is running on http://localhost:3000'))