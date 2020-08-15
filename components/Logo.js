import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .react-badge, & .logo-text": {
      transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    margin: "auto",
  },
  logoIcon: {
    // width: 150,
    // height: 40,
    maxHeight: 40,
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  reactBadge: {
    backgroundColor: "#121212",
    color: "#61DAFB",
  },
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img
        className={classes.logoIcon}
        src="/images/logo-title.png"
        alt="Retic"
      />
    </div>
  );
}
