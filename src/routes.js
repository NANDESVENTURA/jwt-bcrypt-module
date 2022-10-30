import {Router} from 'express';
import EmployeeController from './app/controllers/EmployeeController';
import LoginController from './app/controllers/LoginController';
import ToolController from './app/controllers/ToolController';
import authMiddleware from './app/middlewares/auth';


const routes = new Router ();

routes.post('/employee', EmployeeController.create);
routes.post('/login',LoginController.login);

routes.use(authMiddleware);
routes.put('/employee', EmployeeController.update);
routes.post('/tool', ToolController.registration);
routes.get('/tool',ToolController.list);
routes.get('/tool/:id',ToolController.getById);



export default routes;