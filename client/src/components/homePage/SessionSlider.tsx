import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { ISlider } from "../../fake_data/slider";
import { makeStyles, Theme } from "@material-ui/core";
import { img } from "../../assets";

interface Props {
  dataSlider: ISlider[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px",
    },
  },
  info: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  titleInfo: {
    fontWeight: 600,
    marginTop: "85px",
  },
  textInfo: {
    fontSize: "17px",
    color: "#999",
  },
  imageContainer: { position: "relative" },
  image: {
    width: "100%",
    position: "absolute",
    top: "-25px",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
  imageBack: {
    position: "absolute",
    width: "311px",
    height: "311px",
    backgroundColor: "blue",
    borderRadius: "30% 49% 24% 55%",
    top: "83px",
    left: "0%",
  },
  pagination: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    marginTop: "35px",
    transform: "translateX(500px)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon: {
    cursor: "pointer",
  },
}));

export default function SessionSlider({ dataSlider }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={8} className={classes.info}>
        <Typography variant="h4" color="primary" className={classes.titleInfo}>
          Polo nữ Pima cao cấp
        </Typography>
        <Box marginY={6}>
          <Typography variant="caption" className={classes.textInfo}>
            Nhắc đến sự đẳng cấp là không thể không nhắc đến dòng vải pima. Nó
            tạo nên chất lượng tốt nhất cho bất kỳ sản phẩm thời trang nào. Sợi
            vải pima dài và dày hơn sợi cotton thông thường gấp đôi nhờ công
            nghệ dệt tân tiến. Điều đó làm cho kết cấu áo polo chắc chắn, bền
            chặt, hạn chế tối đa xù lông, mềm mượt, bền màu, vô cùng đảm bảo sức
            khoẻ người dùng
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Xem chi tiết
        </Button>
      </Grid>
      <Grid item sm={12} md={4}>
        <div className={classes.imageContainer}>
          <img src={img.slider.slider_1} alt="" className={classes.image} />
          <div className={classes.imageBack}></div>
        </div>
      </Grid>
      <div className={classes.pagination}>
        <i className={`fas fa-chevron-left ${classes.icon}`}></i>
        <div className="">1/3</div>
        <i className={`fas fa-chevron-right ${classes.icon}`}></i>
      </div>
    </Grid>
  );
}
