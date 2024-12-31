import express from "express"
import { db } from "./src/db/db.js";
import router from "./src/routes/users.routes.js";

const app = express();
app.use(express.json());
process.loadEnvFile()

app.use("/", router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    db();
    console.log("Server is running on port 3000");
})