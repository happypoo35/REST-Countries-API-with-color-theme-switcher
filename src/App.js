import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Error from "./pages/Error";
import { useGlobalContext } from "./context";

const App = () => {
  const { darkTheme } = useGlobalContext();

  return (
    <Router>
      <div className={darkTheme ? "wrapper dark" : "wrapper"}>
        <Header />
        <main className="main pad">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/country/:name">
                <CountryDetails />
              </Route>
              <Route exact path="*">
                <Error />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
