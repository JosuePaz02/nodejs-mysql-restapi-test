import {Router} from 'express'
import {getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee} from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employee/:id', getEmployee)

router.post('/employees', createEmployees)

//*Put es para actualizar todo, y Patch es para hacerlo parcialmente
router.patch('/employees/:id',updateEmployees )

router.delete('/employee/:id', deleteEmployees)

export default router