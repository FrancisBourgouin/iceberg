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
import io from 'socket.io'

function App() {
  io()
  return (
    <div className="App dark">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/interview" >
            <Interview />
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
