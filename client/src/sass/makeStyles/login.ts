import { makeStyles } from "@material-ui/core";
import { imgSlider } from "../../assets";
export const useStyleLogin = makeStyles((theme: any) => {
  return {
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      "& .MuiSvgIcon-root": {
        fontSize: "2rem",
      },
      "& .MuiTypography-body1": {
        fontSize: "1.5rem",
      },
      "& .MuiTypography-h6": {
        fontSize: "2rem",
        textAlign: "center",
        color: "#386591",
      },
    },
    background: {
      background: `url('${imgSlider.slide_1}')center center /cover no-repeat`,
      width: "100%",
      height: "100vh",
      position: "absolute",
      filter: "blur(10px)",
    },
    paper: {
      border: "1px solid blue",
      backgroundColor: "white",
      position: "relative",
      width: "400px",
      maxWidth: "100%",
      padding: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        width: "300px",
      },
    },
    fogetPass: {
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        textAlign: "left",
        paddingLeft: "5px",
      },
    },
    link: {
      textDecoration: "none",
      color: "blue !important",
      fontSize: "1.4rem",
      "&:hover": {
        opacity: "0.8",
      },
    },
    iconPass: {
      cursor: "pointer",
    },
    errText: {
      color: "red",
      paddingLeft: "10px",
      fontSize: "1.4rem",
    },
    check: {},
  };
});
