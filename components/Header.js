import React from "react";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Button, Container } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Logo from "./Logo";

// import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(2),
    color: theme.palette.textColor,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    textDecoration: "none !important",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={classes.root}
      // elevation={0}
      //   color="inherit"
    >
      <Container>
        <Toolbar>
          <Link href={"/"}>
            <a>
              <Logo />
            </a>
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <Link href={"/manual/[lang]"} as={`/manual/es`}>
            <a className={classes.menuButton}>Manual</a>
          </Link>
          <Link href={"/"}>
            <a className={classes.menuButton}>
              <GitHubIcon />
            </a>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
