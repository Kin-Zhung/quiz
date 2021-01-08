const router = require('express').Router();
const Quiz = require('../models/quiz');
const Score = require('../models/score');
const {check, validationResult} = require('express-validator');


router.get('/',(req,res)=>{
    Quiz.find({},['_id','name'])
        .then(quizs => res.json(quizs))
        .catch(e => res.status(400).json('error: '+ e));
});

router.post('/create', [
    check('creator').notEmpty(),
    check('type').notEmpty().trim().escape(),
    check('questions').notEmpty(),
    check('question.*.description').notEmpty().trim().escape(),
    check('question.*.answers').notEmpty().trim().escape(),
    ],
     async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }
        const quiz = new Quiz({
            creator: req.body.creator,
            name: req.body.name,
            type: req.body.type,
            questions: req.body.questions,
            scores: [],
            date: Date.now(), 
        });    
        try{ 
            const saveQuiz = await quiz.save();
            res.json(saveQuiz._id);
        }catch(e){
            res.status(400).json('error:' +e);
        }
    
});

router.get('/:qid',
    check('qid').notEmpty().trim().escape(), (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }
        Quiz.findById(req.params.qid)
        .populate('scores')
        .then(quiz => res.json(quiz))
        .catch(e => res.status(400).json('error: '+ e));

});
router.post('/:id/submit',[
    check('qId').trim().escape(),
    check('uId').trim().escape(),
    check('quiz').notEmpty(),
    check('quiz.*.question').notEmpty().trim().escape(),
    check('quiz.*.answer').notEmpty().trim().escape(),
    check('quiz.*.uAnswer').notEmpty().trim().escape(),
    check('quiz.*.correct').isBoolean(),
    check('score').isNumeric(),
    check('time').isNumeric(),
    ], (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }
        const score = new Score({
            userId: req.body.userId,
            quiz: req.body.quiz,
            score: req.body.score,
            time: req.body.time,
            date: Date.now()
        });
        try{ 
            score.save().then(
                Quiz.findByIdAndUpdate(req.body.qId,{ "$push" :{"scores": score._id}})
                .then(res.json(score)).
                catch(e => res.status(401).json('error: '+ e))
            ).catch(e => res.status(402).json('error: '+ e));
        }catch(e){
            res.status(400).json('error:' +e);
        }

});
module.exports = router;

