import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
  title: {
    margin: theme.spacing(1),
  },
  menuButton: {
    // margin: theme.spacing(2),
    color: theme.palette.darkColor,
  },
}));

export default function Sidebar({ items = [], propsClasses = {} }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(["2"]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    console.log("event: ", event);
    console.log("nodeIds: ", nodeIds);
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    console.log("event: ", event);
    console.log("nodeIds: ", nodeIds);
    setSelected(nodeIds);
  };

  const getItemTree = (item) => {
    return (
      <Typography
        variant="subtitle2"
        className={clsx(
          classes.title,
          item.isFolder || !item.parent ? "uppercase font-bold" : "capitalize"
        )}
      >
        {item.slug || item.section}
      </Typography>
    );
  };

  const getItemsHTML = (items, count = {}) => {
    return (
      <div>
        {items.map(({ params }) => {
          const _nodeId = count.value;
          count.value = count.value + 1;
          const _children = params.isFolder
            ? getItemsHTML(params.children, count)
            : null;
          const linkHref =
            !params.isFolder && params.slug
              ? "/manual/[lang]/[section]/[slug]"
              : "/manual/[lang]/[section]";
          const linkAs =
            !params.isFolder && params.slug
              ? `/manual/${params.lang}/${params.section}/${params.slug}`
              : `/manual/${params.lang}/${params.section}`;
          return (
            <TreeItem
              nodeId={_nodeId.toString()}
              key={_nodeId}
              label={
                !params.isFolder ? (
                  <Link href={linkHref} as={linkAs}>
                    <a className={classes.menuButton}>{getItemTree(params)}</a>
                  </Link>
                ) : (
                  getItemTree(params)
                )
              }
            >
              {_children}
            </TreeItem>
          );
        })}
      </div>
    );
  };
  const itemsHTML = items?.length ? getItemsHTML(items, { value: 1 }) : null;

  return (
    <div className={propsClasses}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {itemsHTML}
      </TreeView>
    </div>
  );
}
