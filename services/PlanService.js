const Database = require("../models/index")

class PlanService{
    constructor(){
        this.Plan = Database["Plan"]
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
            }catch(err){
                errors.push("Não foi possivel salvar o plano")
                return errors
            }
        }else{
            return errors
        }
    }

    validate(plan, errors){
        var erroCount = 0

        if(plan.title == undefined){
            errors.title_msg = "O titulo é invalido"
            erroCount++
        }else{
            if(plan.title < 2){
                errors.title_msg = "O titulo é invalido"
                erroCount++
            }
        }

        if(plan.list == undefined){
            errors.title_msg = "A lista é invalida"
            erroCount++
        }else{
            if(plan.list.length < 2){
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