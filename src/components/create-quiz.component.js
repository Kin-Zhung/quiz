import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class CreateQuiz extends Component {
    constructor(props){
        super(props)

        this.cName = this.cName.bind(this);
        this.cType = this.cType.bind(this);
        this.cDescription = this.cDescription.bind(this);
        this.cText = this.cText.bind(this);
        this.cCorrect = this.cCorrect.bind(this);
        this.addAnswers = this.addAnswers.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            creator: '5ff5155b5d186710403d620b',
            name: '',
            type:'',
            questions:[],
            description:'',
            answers:[],
            correct: false,
            text: '',
        }
    }
    cName(e){
        this.setState({
            name: e.target.value
        });
    }
    cType(e){
        this.setState({
            type: e.target.value
        });
    }
    cDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    cText(e){
        this.setState({
            text: e.target.value
        });
    }
    cCorrect(e){
        this.setState({
            correct: true
        });
    }
    addQuestion(){

        const questions = this.state.questions.slice(0);
        
        questions.push({
            description: this.state.description,
            answers: this.state.answers,
        })
        this.setState({
            questions: questions,
            description: ''
        })
    }
    addAnswers(){
  
        const answers = this.state.answers.slice(0);
        
        answers.push({
            text: this.state.text,
            correct: this.state.correct,
        })
        this.setState({
            answers: answers,
            text: '',
            correct: false

        })
    }

    onSubmit(e){
        e.preventDefault();

        const quiz = {
            creator: this.state.creator,
            name: this.state.name,
            type: this.state.type,
            questions: this.state.questions,
        }
        console.log(quiz);

        axios.post('http://localhost:5000/quiz/create',quiz).then(res => console.log(res.data));

        window.location="/";
    }



  render() {
    return (
        <div>
        <h3>Create New Quiz</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
            <label>Quiz Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.cName}
                />
          </div>

          <div className="form-group">
            <label>Quiz Type:</label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.type}
                onChange={this.cType}
                />
          </div>
          <hr/>
            <form onSubmit={this.addQuestion}>
                <div className="form-group"> 
                <label> Quiz Question: </label>
                    <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.cDescription}
                    />
                </div>
                <form onSubmit={this.addAnswers}>
                    <div className="form-group"> 
                        <label>Question options: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.text}
                            onChange={this.cText}
                            />
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="correct" id="correct" checked={this.state.correct} value = {this.state.correct} onChange={this.cCorrect}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Correct
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Add option" className="btn btn-primary" onClick={this.addAnswers} />
                    </div>
                </form>
                <input type="button" value="Add Question" className="btn btn-primary" onClick={this.addQuestion} />
            </form>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Question List</th>
                {/* <th scope="col">Options</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    this.state.questions.map(i =>{
                        return(
                            <tr>
                               <td>{i.description}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            <hr/>

  
          <div className="form-group">
            <input type="submit" value="Create Quiz" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}