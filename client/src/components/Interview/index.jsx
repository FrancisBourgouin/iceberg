import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Book from "./Book";
import Live from "./Live";
import Review from "./Review";
import View from "./View";

const Interview = props => {
  const { interviewer } = props
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <h3>Something?</h3>
      </Route>
      <Route path={`${match.path}/book`}>
        <Book />
      </Route>
      <Route path={`${match.path}/live/:interviewId`}>
        <Live {...{ interviewer }} />
      </Route>
      <Route path={`${match.path}/review`}>
        <Review />
      </Route>
      <Route path={`${match.path}/view`}>
        <View />
      </Route>
    </Switch>
  )
}

export default Interview