const express = require("express")
const router = express.Router()
const plansController = require("../controllers/plansController")

router.get("/", plansController.index)

router.get("/create", plansController.create)

router.get("/edit/:id", plansController.edit)

router.post("/store", plansController.store)

router.post("/update", plansController.update)

router.get("/delete/:id", plansController.delete)

module.exports = router