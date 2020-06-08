const express = require("express")
const router = express.Router()
const plansController = require("../controllers/plansController")

router.get("/create", plansController.create)

router.post("/store", plansController.store)

module.exports = router