import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './sass/index.scss';
import { AppRouterConfig } from './core/AppRouterConstant';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        {AppRouterConfig.map((e,index) => (
          <Route path={e.path} exact={e.exact} component={e.component} key={index}/>
        ))}
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
