const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

const TodoModel = mongoose.model("TodoModel", TodoSchema)

module.exports = TodoModel
