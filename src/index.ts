import dotenv from "dotenv"
dotenv.config()

import app from "./app";

const SERVER_PORT = process.env.SERVER_PORT as string

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))