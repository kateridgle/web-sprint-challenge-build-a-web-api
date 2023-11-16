// add middlewares here related to actions

const Actions = require('./actions-model')

async function checkActionParams(req, res, next){
    try{
        const action = await Actions.get(req.params.id)
        if(action){
            req.action =action
            next()
        }
        else {
            next({status:404, message: 'error: action not found'})
        }
    }
    catch(err){
        next(err)
    }
}

function checkActionBody(req,res,next){
    const{name, descpription}=req.body
    if(name==undefined || typeof name !== 'string' || !name.trim().length){
        next({status: 400, message: 'requires name'})
    } 
    else if (descpription==undefined || typeof descpription !== 'string'|| !descpription.trim().length) {
        next({status: 400, message: 'requires description'})
    }
    else {
        req.name = name.trim()
        req.descpription = descpription.trim()
        next()
    }

}

module.exports={
    checkActionParams,
    checkActionBody
}
