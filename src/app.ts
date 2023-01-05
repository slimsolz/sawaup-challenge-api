import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from 'helmet'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import routes from "./routes";
import { errorResponse } from "./helpers/responseUtil";

const app = express();

app.use(helmet())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerDocument = YAML.load(`${process.cwd()}/src/swagger.yaml`);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "NotFoundError") {
    return errorResponse(res, 404, err.message);
  }

  return errorResponse(res, 500, "Internal Error");
});

export default app;
