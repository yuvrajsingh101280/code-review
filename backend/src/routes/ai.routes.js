import express from "express"
import { aicontroller } from "../controller/ai.controller.js"
const router = express.Router()

router.post("/code-review", aicontroller)



export default router