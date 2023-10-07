import express, { json } from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", employeesRoutes);

//*Los middleware casi siempre llevan next, y este de aqui lo que haces es que si el cliente busca algo que no se encuentre no le regresa el html por defecto, sino que le regresa ese mensaje de error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
