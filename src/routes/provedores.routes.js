import {Router} from 'express'
import {getProveedor, getProveedores, createProveedor, deleteProvedor, updateProvedor} from '../controllers/provedores.controller.js'

const router = Router()

router.get('/provedores', getProveedores)

router.get('/provedor/:id', getProveedor)

router.post('/provedores', createProveedor)

//*Put es para actualizar todo, y Patch es para hacerlo parcialmente
router.patch('/provedor/:id', updateProvedor)

router.delete('/provedor/:id', deleteProvedor)

export default router