const express = require('express');
const Model  = require('./model');
const router = express.Router()
//Post Method
router.post('/post',async (req, res) => {
    const data = new Model({
        name:req.body.name,
        description: req.body.description
    })
    try {
        const dataToSave = await data.save();
        res.json(dataToSave);
    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
});

//Get all Method
router.get('/getAll', async(req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async(req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
})

//Update by ID Method
router.patch('/update/:id',async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new:true};
        const result = await Model.findByIdAndUpdate(id,updatedData,options);
        res.send(result)
    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
})

//Delete by ID Method
router.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id);
        res.send(`Document with ${result.name} has been deleted`)
    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
})
module.exports = router;