import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter";
//import { AfiliadoRouter } from "./routers/AfiliadoRouter";
import withClearCache from "./ClearCache";

import { store } from "./store/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const basename = process.env.REACT_APP_BASENAME

const MainApp = () => {
  return (
    <Provider store={store}>
      <Router basename={basename}>
        <Switch>
          {/*<Route path="/afiliado" component={AfiliadoRouter} />*/}
          <Route path="/" component={AppRouter} />
        </Switch>
      </Router>
    </Provider>
  );
};

const ClearCacheComponent = withClearCache(MainApp);

function MutualApp() {
  return <ClearCacheComponent />;
}

export default MutualApp;