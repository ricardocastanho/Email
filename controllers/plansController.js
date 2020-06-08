const PlanService = require("../services/PlanService")

class plansController{
    
    create(req, res){
        res.render("plan/create")
    }

    store(req, res){
        var {title, list, client, value, imports} = req.body

        var plan = {
            title,
            list,
            client,
            value,
            import: imports
        }

        PlanService.store(plan)

        res.redirect("/plan/create")
    }

}

module.exports = new plansController()