import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class QuizDetail extends Component {
  constructor(props){
    super(props);
    this.getAverage = this.getAverage.bind(this);
    this.state ={
      name:'',
      attempted:'',
      length:'',
      quiz: [],
      scores:[],
    }

  }

  componentDidMount(){

    const {quizid} = this.props.match.params;

    axios.get(`http://localhost:5000/quiz/${quizid}`).then(d => {
      this.setState({
        name: d.data.name,
        attempted: d.data.questions.length,
        quiz: d.data.questions,
        scores: d.data.scores
      })
      this.getAverage();
      console.log(this.state.quiz);
    });
    
  }
  getAverage(){
    let total = 0;
    for(var x = 0; x < this.state.scores.length; x++){
      total += this.state.scores[x].score
    }
    const average = total/this.state.scores.length;
    return average;
  }
  render() {
    return (
      <div>
        <h1>Quiz Name:{this.state.name}</h1>
        <h3>average percent:{this.getAverage()}</h3>
        <h3>number of attempts:{this.state.attempted}</h3>
        <h3>number of questions:{this.state.quiz.length}</h3>
      </div>
    );
  }
}