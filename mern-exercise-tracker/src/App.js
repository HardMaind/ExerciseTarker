import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./component/navabar.component";
import ExercisesList from "./component/exercises-list.component";
import EditExercises from "./component/edit-exercises.component";
import CreateExercises from "./component/create-exercises.component";
import CreateUser from "./component/create-user.component";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/create" component={CreateExercises} />
        <Route path="/edit/:id" component={EditExercises} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
