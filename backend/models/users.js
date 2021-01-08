const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:7
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    firstName: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    lastName: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    cQuiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    }],
    tQuiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Score'
        
    }]


},{
    timestamps:true,
});

const User = mongoose.model('User',userSchema);

module.exports = User;