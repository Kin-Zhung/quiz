import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import QuizList from './components/quiz-list.component';
import CreateQuiz from './components/create-quiz.component';
import QuizDetail from './components/quiz-detail.component';
import Quiz from './components/quiz.component';

function App() {
  return (
    <Router>
      <Navbar />
        <Route path="/" exact component={QuizList} /> 
        <Route path="/create" exact component={CreateQuiz} />
        <Route path="/quiz/:quizid" exact component={QuizDetail}/>
         
    </Router>
  );
}

export default App;
