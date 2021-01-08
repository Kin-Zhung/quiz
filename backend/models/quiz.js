const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    questions:{ 
        type: [
                {
                    description:{type:String, required:true},
                    answers:{type:[
                        {
                            text:{type:String, required: true},
                            correct:{type:Boolean, required: true, default: false}
                        }
                    ],
                    required:true
                    }
                }
        ],
    require: true    
    },
    attempted:{
        type: Number,
    },
    date: {
        type: Date,
        required: true
    },
    scores:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Score',
    }],
});

const Quiz = mongoose.model('Quiz',quizSchema);

module.exports = Quiz;