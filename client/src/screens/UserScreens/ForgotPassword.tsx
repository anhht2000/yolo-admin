import React from "react";
import "../../sass/forgotpass.scss";
import { string } from "../../assets/string";
import { TextField, Button } from "@material-ui/core";
import { imgLogo } from "../../assets";
const ForgotPassword = () => {
  return (
    <div className="container_forgotpass">
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
              placeholder={string.HolderEmail}
            />
          </div>
        </div>
        <div className="button_forgotpass">
          <Button variant="contained" color="primary">
            {string.Confirm}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
