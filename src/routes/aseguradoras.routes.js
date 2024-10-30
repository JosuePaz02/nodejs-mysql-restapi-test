import {Router} from 'express'
import {getAseguradoras, getAseguradora, createAseguradora, updateAseguradoras, deleteAseguradora} from '../controllers/aseguradora.controller.js'

const router = Router()

router.get('/aseguradoras', getAseguradoras)

router.get('/aseguradora/:id', getAseguradora)

router.post('/aseguradoras', createAseguradora)

//*Put es para actualizar todo, y Patch es para hacerlo parcialmente
router.patch('/aseguradora/:id', updateAseguradoras)

router.delete('/aseguradora/:id', deleteAseguradora)

export default router