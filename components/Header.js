import React from "react";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Container } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
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

export default function Header({ isFull = false, body = null }) {
  const classes = useStyles();

  const getToolbar = () => (
    <Toolbar>
      {body}
      <Link href={"/"}>
        <a>
          <Logo />
        </a>
      </Link>
      <Typography variant="h6" className={classes.title}></Typography>
      <Link href={"/manual/[lang]/[section]"} as={`/manual/es/introduction`}>
        <a className={classes.menuButton}>Manual</a>
      </Link>
      <a
        href="https://github.com/reticpy/retic"
        target="_blank"
        className={classes.menuButton}
      >
        <GitHubIcon />
      </a>
    </Toolbar>
  );

  return (
    <AppBar
      position="fixed"
      className={classes.root}
      // elevation={0}
      // color="inherit"
    >
      {isFull ? (
        <div>{getToolbar()}</div>
      ) : (
        <Container>{getToolbar()}</Container>
      )}
    </AppBar>
  );
}
