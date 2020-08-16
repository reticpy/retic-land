import { Fragment } from "react";

import { Grid } from "@material-ui/core";

import Header from "./Header";
import Sidebar from "./Sidebar";
export default function LayoutSidebar({ children, items = [] }) {
  return (
    <Fragment>
      <Header isFull={true} />
      <div className="mx-auto antialiased py-24 px-4 font-body font-sans text-lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            {/* Add sidebar */}
            <Sidebar items={items} />
          </Grid>
          <Grid item xs={12} sm={10}>
            {/* Show article */}
            <main className="max-w-screen-lg mx-auto antialiased px-4 prose-sm prose sm:prose lg:prose-lg">
              {children}
            </main>
          </Grid>
        </Grid>
      </div>
      <footer className="text-lg font-light">
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://nextjs.org/">Next.js</a>
        &#128293;
      </footer>
    </Fragment>
  );
}
