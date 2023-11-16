// Write your "projects" router here!

//module 2 objective 2?// same for action routers?//

const express=require('express')
const Projects=require('./projects-model')
const { checkProjectId, checkProjectBody }=require('./projects-middleware')
const router=express.Router()

router.get('/',(req,res,next)=>{
    Projects.get()
            .then(projects=>{
                res.status(200).json(projects)
            })
            .catch(next)


})

router.get('/:id', checkProjectId,(req, res) => {
    res.status(200).json(req.project)


})
router.post('/', checkProjectBody, (req, res,next) => {
    Projects.insert({ name: req.name, description: req.description, completed:true})
            .then(project=>{
                res.status(201).json(project)
            })
            .catch(next)


})

router.put('/:id', checkProjectId, checkProjectBody, async (req, res, next) => {
    try {
        const updates = req.body;
        if (!updates.completed) {
            if (!('completed' in updates)){
                res.status(400).json({ message: 'Missing body' });
            }
            updates.completed = false;
        }

        await Projects.update(req.params.id, updates);

        const updatedProject = await Projects.get(req.params.id);
        res.status(200).json(updatedProject);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', checkProjectId, (req, res,next) => {
    Projects.remove(req.params.id)
            .then(()=>{
                res.status(200).json({message:'Project has been deleted'})
            })
            .catch(next)


})

router.get('/:id/actions', checkProjectId, (req, res,next) => {
    Projects.getProjectActions(req.params.id)
            .then(actions=>{
                res.status(200).json(actions)
            })
            .catch(next)


})


router.use((err,req,res,next)=>{
    res.status(err.status||500).json({message:err.message})
})


module.exports=router