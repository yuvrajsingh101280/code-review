import express from "express"
import dotenv from "dotenv"
import aiRoute from "./routes/ai.routes.js"
dotenv.config()


const app = express()
app.use(express.json())
const port = process.env.PORT || 8000
app.listen(port, () => {

    console.log(`server starting at http://localhost:${port}`)

})
app.use("/ai", aiRoute)