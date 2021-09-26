import React, { useState, useEffect } from "react";
import "../../sass/forgotpass.scss";
import { string } from "../../assets/string";
import { TextField, Button } from "@material-ui/core";
import { validateEmail } from "../../lib/FunctHelper";
import { imgLogo } from "../../assets";
const ForgotPassword = () => {
  const [values, setValues] = useState({
    amount: "",
    errorE: false,
    erroremail: "",
  });
  const CheckEmail = (email: string) => {
    if (!validateEmail(email) && values.amount.length > 0) {
      return setValues({
        ...values,
        errorE: true,
        erroremail: `${string.ErrorEmail}`,
      });
    } else {
      return setValues({ ...values, errorE: false, erroremail: "" });
    }
  };
  const handleEmail = (event: any) => {
    setValues({
      ...values,
      amount: event.target.value,
    });
  };
  useEffect(() => {
    CheckEmail(values.amount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.amount]);
  return (
    <div className="container_forgotpass">
      <div className="background_img"></div>
      <div className="content_forgotpass">
        <div className="header_forgotpass">
          <div>
            <img
              src={imgLogo.logo_2}
              alt="Logo forgotpass"
              className="logo_forgotpass"
            />
          </div>
          <label>{string.ForgotPassword}</label>
        </div>
        <div className="form_forgotpass">
          <div className="acount_forgotpass">
            <TextField
              label={string.Acount}
              fullWidth={true}
              error={values.errorE}
              helperText={values.erroremail}
              value={values.amount}
              onChange={handleEmail}
              placeholder={string.HolderEmail}
            />
          </div>
        </div>
        <div className="button_forgotpass">
          <Button variant="contained" color="primary">
            {string.Send}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
