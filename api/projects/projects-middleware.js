// add middlewares here related to projects

const projects = require('./projects-model')

async function checkProjectId(req,res,next) {
    try{
        const project = await projects.get(req.params.id);
        if(project){
            req.project = project;
            next();

        }
        else {
            next({status:404, message:'Project not found'})
        }
    }
    catch(err){
        next(err)
    }
}

function checkProjectBody(req,res,next){
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
    checkProjectId,
    checkProjectBody
}