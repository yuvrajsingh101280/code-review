import express from "express"
import dotenv from "dotenv"
import aiRoute from "./routes/ai.routes.js"
import cors from "cors"
import axios from "axios"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8000
app.get("/", (req, res) => {
    res.send("AI Server is Running 🚀");
});

app.listen(port, () => {

    console.log(`server starting at http://localhost:${port}`)

})
app.use("/ai", aiRoute)


// code for production deploy
const url = "https://code-review-1-qc2x.onrender.com";
const interval = 30000;

function reloadWebsite() {
    axios
        .get(url)
        .then((res) => {
            console.log("Website reloaded");
        })
        .catch((err) => {
            console.log(`Error : ${err}`);
        });
}

setInterval(reloadWebsite, interval);