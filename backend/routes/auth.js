const User = require('../models/users');
const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


router.get('/:qid',
    check('qid').notEmpty().trim().escape(), (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }
        User.findById(req.params.qid)
        .populate('tQuiz','cQuiz')
        .then(quiz => res.json(quiz))
        .catch(e => res.status(400).json('error: '+ e));

});
router.post('/register',[
    check('email').isLength({min:7}).isEmail().normalizeEmail(),
    check('password').isLength({min: 7}).trim().escape(),
    check('firstName').isLength({min: 3}).trim().escape(),
    check('lastName').isLength({min: 3}).trim().escape(),
    ],
    async (req, res) =>{
        const exist = await User.findOne({email: req.body.email});
        if(exist){
            return  res.status(400).send("user exist!");
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            email: req.body.email,
            password: hashpassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
        });
        try{
            const saveUser = await user.save();
            res.send(user._id);
        }catch(e){
            res.status(400).send(e);
        }
});

router.post('/login',[
    check('email').isLength({min:7}).isEmail().normalizeEmail(),
    check('password').isLength({min: 7}).trim().escape(),
    ],
    async (req, res) =>{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return  res.status(400).send("invaild please try again.");
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jsonp(errors.array());
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        if(valid){
            return res.send('logged in');
        }

        res.status(400).send('invalid password');      
});
module.exports = router;