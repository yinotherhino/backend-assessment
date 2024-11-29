import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { errorHandler } from "./utils/error";
import swaggerDocs from "./utils/swagger-doc";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
