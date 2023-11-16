// Write your "actions" router here!

//something broken here, refer to project router

const express = require('express')
const Actions = require('./actions-model')
const {checkActionId, checkActionBody} = require('./actions-middlware')
const router = express.Router();

router.get('/', (req, res, next)=>{
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/:id',checkActionId, (req, res)=>{
    res.status(200).json(req.action)
})

router.post('/', checkActionBody, async(req,res,next)=>{
    try{
        const newAction = await Actions.insert(req.body)
        if(!newAction){
            res.status(404).json({message:'you need an id'})
        }
        else{
            res.status(201).json(newAction)
        }
    }
    catch(err){
        next(err)
    }
})

router.put('/:id', checkActionId, checkActionBody, async (req, res, next)=>{ //post having issues connecting? comeback later
    try{
        const newBody = req.body;
        if(!newBody.completed){
            if(!('completed' in newBody)){
                res.status(400).json({message: 'missing body'})
            }
            newBody.completed=false;
        }
        await Actions.update(req.params.id, newBody)

    const updatedAction =await Actions.get(req.params.id)
    res.status(200).json(updatedAction)
        
    }
    catch(err){
        next(err);
    }
    
        
})

router.delete('/:id', checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Action has been deleted' })
        })
        .catch(next)


})
router.use((err,req,res,next)=>{
    res.status(err.status||500).json({
        message: err.message
    })
})

module.exports=router