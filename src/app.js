import express, { json } from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import clienteRoutes from './routes/clientes.routes.js'
import vehiculosRoutes from './routes/vehiculos.routes.js'
import provedoresRoutes from './routes/provedores.routes.js'
import aseguradorasRoutes from './routes/aseguradoras.routes.js'

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", employeesRoutes);
app.use('/api', clienteRoutes)
app.use('/api', vehiculosRoutes)
app.use('/api', provedoresRoutes)
app.use('/api', aseguradorasRoutes)

//*Los middleware casi siempre llevan next, y este de aqui lo que haces es que si el cliente busca algo que no se encuentre no le regresa el html por defecto, sino que le regresa ese mensaje de error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
