import {Router} from 'express'
import {getClientes, getCliente, createCliente, updateCliente, deleteCliente} from '../controllers/cliente.controller.js'


const router = Router()

router.get('/clientes', getClientes)

router.get('/cliente/:id', getCliente)

router.post('/clientes', createCliente)

//*Put es para actualizar todo, y Patch es para hacerlo parcialmente
router.patch('/cliente/:id', updateCliente)

router.delete('/cliente/:id', deleteCliente)

export default router