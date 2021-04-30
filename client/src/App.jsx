import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Interview from './components/Interview'
import InterviewReview from './components/InterviewReview'
import InterviewView from './components/InterviewView'
import InterviewNew from './components/InterviewNew'

import './App.scss';
import io from 'socket.io'

function App() {
  io()
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/interview/" >
            <Interview />
          </Route>
          <Route path="/interview/:interview_id/review" >
            <InterviewReview />
          </Route>
          <Route path="/interview/:interview_id/view" >
            <InterviewView />
          </Route>
          <Route path="/interview/new" >
            <InterviewNew />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
