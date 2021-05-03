import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './components/Dashboard'
import Interview from './components/Interview'
import Home from './components/Home'

import './App.scss';
import { useState } from "react";

function App() {
  const [interviewer, setInterviewer] = useState(null)
  return (
    <div className="App dark">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home {...{ setInterviewer }} />
          </Route>
          <Route path="/interview" >
            <Interview {...{ interviewer }} />
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
