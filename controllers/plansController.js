const PlanService = require("../services/PlanService")

class plansController{
    
    async index(req, res){
        var plans = await PlanService.getAll()
        res.render("plan/index", {plans})
    }

    create(req, res){
        res.render("plan/create", {title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg')})
    }

    async store(req, res){
        var {title, list, client, price, imports} = req.body

        var plan = {
            title,
            list,
            client,
            price,
            import: imports
        }

        var result = await PlanService.store(plan)

        if(result == true){
            res.redirect("/plan/")
        }else{
            req.flash('title_msg', result.title_msg)
            req.flash('list_msg', result.list_msg)
            res.redirect("/plan/create")
        }
    }

    async edit(req, res){
        var plans = await PlanService.getById(req.params.id)
        res.render("plan/edit", {plans, title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg')})
    }

    async update(req, res){
        var {title, list, client, price, imports, id} = req.body

        var plan = {
            title,
            list,
            client,
            price,
            import: imports
        }
        var result = await PlanService.update(id, plan)

        if(result == true){
            res.redirect("/plan/")
        }else{
            req.flash('title_msg', result.title_msg)
            req.flash('list_msg', result.list_msg)
            res.redirect("/plan/edit/" + id)
        }
    }
    
    async delete(id){
        var {id} = req.params
        var result = await PlanService.delete(id)

        if(result == true){
            res.redirect("/plan/")
        }else{
            req.flash('title_msg', result.title_msg)
            req.flash('list_msg', result.list_msg)
            res.redirect("/plan/")
        }
    }
}

module.exports = new plansController()