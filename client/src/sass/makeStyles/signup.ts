import { makeStyles } from "@material-ui/core";
import { imgSlider } from "../../assets";

export const useStyleSignUp = makeStyles((theme: any) => {
  return {
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      "& .MuiFormLabel-root": {
        fontSize: "1.6rem",
      },
      "& .MuiTypography-caption": {
        fontSize: "1.25rem",
      },
      "& .MuiButton-outlinedSizeLarge": {
        fontSize: "1.4rem",
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
    link: {
      textDecoration: "none",
      color: "blue !important",
      fontSize: "1.4rem",
      "&:hover": {
        opacity: "0.8",
      },
    },
    textRight: { textAlign: "right" },
    input: {
      width: "240px",
    },
    errText: {
      color: "red",
      paddingLeft: "10px",
      fontSize: "1.4rem",
    },
  };
});
