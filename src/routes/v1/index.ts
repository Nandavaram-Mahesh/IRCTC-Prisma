import express from 'express'

import stationRoutes from './station.route.js'
import userRoutes from './user.route.js'

const router = express.Router()

// /api/v1 → handled here
router.get('/', (req, res) => {
  res.send('API v1 Root')
})

// /api/v1/stations
router.use('/stations', stationRoutes)

// /api/v1/users
router.use('/users', userRoutes)

export default router