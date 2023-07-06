import Garden from "./components/Garden/Garden";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const plants = useSelector(store => store.plantList);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to your garden!</h1>
      </header>
      <Router>
        <Route path="/">
          <Garden />
        </Route>
        {plants.map((plant) => {
          return(
            <Route path={`/path/${plant.id}`}>
            </Route>
          )
        })}
      </Router>
    </div>
  );
}

export default App;
