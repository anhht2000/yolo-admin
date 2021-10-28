import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./sass/style.scss";
import { AppRouterConfig } from "./core/AppRouterConstant";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, CssBaseline } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { actionPlusTotalProducts } from "./redux/reducers/productDetail.reducer";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cartProductsLocalStorage = localStorage.getItem("cartProducts");
    let number = 0;
    if (cartProductsLocalStorage !== null) {
      let dataProducts = JSON.parse(cartProductsLocalStorage);
      dataProducts.forEach((e: any) => {
        number += e.quantity;
      });
    }
    dispatch(actionPlusTotalProducts(number));
  }, []);
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
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
  document.getElementById("root")
);
