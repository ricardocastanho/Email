const Database = require("../models/index")

class PlanService{
    constructor(){
        this.Plan = Database["Plan"]
    }

    async getAll(){
        try{
            return await this.Plan.findAll()
        }catch(err){
            return undefined
        }
    }

    async getById(id){
        try{
            return await this.Plan.findByPk(id)
        }catch(err){
            return undefined
        }
    }

    async store(plan){
        var errors = {}

        if(plan.import != undefined){
            plan.import = true 
        }else{
            plan.import = false
        }

        var isValid = this.validate(plan, errors)

        if(isValid){
            try{
                await this.Plan.create(plan)
                return true
            }catch(errors){
                return this.errors
            }
        }else{
            return errors
        }
    }

    async update(id, plan){
        var errors = {}

        if(plan.import != undefined){
            plan.import = true 
        }else{
            plan.import = false
        }

        var isValid = this.validate(plan, errors)

        if(isValid){
            try{
                var plans = await this.getById(id)
                plans.title = plan.title
                plans.list = plan.list
                plans.client = plan.client
                plans.value = plan.value
                await plans.save()
                return true
            }catch(errors){
                return this.errors
            }
        }else{
            return errors
        }
    }

    async delete(id){
        var plan = await this.getById(id)
        plan.softDeletes = true
        await plan.save()
        return true
    }

    validate(plan, errors){
        var erroCount = 0

        if(plan.title == undefined){
            errors.title_msg = "O titulo é invalido"
            erroCount++
        }else{
            if(plan.title.length < 2){
                errors.title_msg = "O titulo é invalido"
                erroCount++
            }
        }

        if(plan.list == undefined){
            errors.title_msg = "A lista é invalida"
            erroCount++
        }else{
            if(plan.list < 2){
                errors.title_msg = "A lista é invalida"
                erroCount++
            }
        }

        if(erroCount == 0){
            return true
        }else{
            return false
        }
    }

}

module.exports = new PlanService()