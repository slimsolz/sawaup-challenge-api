import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import { errorResponse } from "./helpers/responseUtil";

const app = express();

const port = process.env.PORT || 3000;
app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(">>>>", err);
  errorResponse(res, 400, err.message);
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;
