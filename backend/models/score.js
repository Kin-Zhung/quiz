const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },

    quiz:{ 
        type: [{
            question: String,
            answer: String,
            uAnswer:String,
            correct:Boolean
        }],
    require: true    
    },
    score:{
        type:Number
    },
    time:{
        type:Number
    },
    date: {
        type: Date,
        required: true
    }
});

const Score = mongoose.model('Score',scoreSchema);

module.exports = Score;