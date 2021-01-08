import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class QuizList extends Component {
  constructor(props){
    super(props);

    this.state ={
      quizs: [],
    }

  }

  componentDidMount(){
    axios.get('http://localhost:5000/quiz/').then(res =>{
      this.setState({quizs: res.data})
      console.log(this.state.quizs)
    });
    
  }

  render() {
    return (
      <div>
      <h1>Quizs</h1>
      {
        this.state.quizs.map(function(q,index){
           return(
            <div class="card">
            <div class="card-body">
            <Link to={`/quiz/${q._id}`} class="nav-link" >{q.name}</Link>
            </div>
          </div>
           )
        })
      }
      </div>
    );
  }
}