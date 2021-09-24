import { makeStyles } from "@material-ui/core";
import { imgBackground } from "./../../assets/index";
export const useStyleForget = makeStyles((theme: any) => {
  return {
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      "& .MuiTypography-h6": {
        fontSize: "1.6rem",
      },
      "& .MuiButton-outlinedSizeLarge": {
        fontSize: "1.6rem",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "1.35rem",
      },
    },
    background: {
      background: `url('${imgBackground.background}')center center /cover no-repeat`,
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
    link: {
      textDecoration: "none",
      color: "blue !important",
      fontSize: "1.4rem",
      "&:hover": {
        opacity: "0.8",
      },
    },
    textRight: { textAlign: "right" },
    mTop: {
      marginTop: "15px",
    },
    errText: {
      color: "red",
      paddingLeft: "10px",
    },
  };
});
