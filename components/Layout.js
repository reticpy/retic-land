import { Fragment } from "react";

import Header from "./Header";
export default function Layout({ children }) {
  return (
    <Fragment>
      <Header isFull={true}/>
      <div className="max-w-screen-sm mx-auto antialiased py-24 px-4">
        <main>{children}</main>
      </div>
      {/* <footer className="text-lg font-light">
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://nextjs.org/">Next.js</a>
        &#128293;
      </footer> */}
    </Fragment>
  );
}
