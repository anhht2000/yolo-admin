import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./sass/index.scss";
import { AppRouterConfig } from "./core/AppRouterConstant";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, CssBaseline } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        {AppRouterConfig.map((e, index) => (
          <Route
            path={e.path}
            exact={e.exact}
            component={e.component}
            key={index}
          />
        ))}
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
