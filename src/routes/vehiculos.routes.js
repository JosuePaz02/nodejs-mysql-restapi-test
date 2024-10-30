import {Router} from 'express'
import {getVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from '../controllers/vehiculo.controller.js'

const router = Router()

router.get('/vehiculos', getVehiculos)

router.get('/vehiculo/:id', getVehiculo)

router.post('/vehiculos', createVehiculo)

//*Put es para actualizar todo, y Patch es para hacerlo parcialmente
router.patch('/vehiculo/:id', updateVehiculo)

router.delete('/vehiculo/:id', deleteVehiculo)

export default router