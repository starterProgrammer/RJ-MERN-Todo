const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// Dependncy
app.use(express.json())
app.use(cors()) 


// Connect to mongoDB
mongoose.connect('mongodb+srv://alitalaeeengeneer:ali23fatemeh@cluster.xjbfdup.mongodb.net/mern-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connected to DB") }).catch(console.error())

// Import DB Model To use 
const TodoModel = require('./models/TodoModel')

// Get Data 
app.get('/todos', async (req, res) => {
    // req ==> what client will send 
    // res ==> what server will back 
    const data = await TodoModel.find();
    res.json(data)
})


// Add Data 
app.post('/todos/new', (req, res) => {
    // req ==> what client will send 
    // res ==> what server will back 
    const result = new TodoModel({
        text: req.body.text
    })
    // To Save in DB
    result.save()
    res.json(result)
})

// Update Data 
app.put('/todos/complete/:id', async (req, res) => {
    const result = await TodoModel.findById(req.params.id)
    result.complete = !result.complete
    result.save()
    res.json(result)
})

// Delete Data 
app.delete('/todos/delete', async (req, res) => {
    console.log(req.body)
    const result = await TodoModel.findByIdAndDelete(req.body.id) 
    res.json(result)
})


app.listen(3001, () => { console.log("server is running on port 3001"); }) 