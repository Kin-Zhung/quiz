const router = require('express').Router();
const Quiz = require('../models/quiz');
const Score = require('../models/score');
const {check, validationResult} = require('express-validator');
