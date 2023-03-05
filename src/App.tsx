import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/article/:id" exact>
          <ArticlePage />
        </Route>
        <Route path="/search/:searchTerm" exact>
          <SearchPage />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}
