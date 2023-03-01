import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArticlePage from "./pages/articles/ArticlePage";
import HomePage from "./pages/homepage/HomePage";

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
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}
