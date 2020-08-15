import { Fragment } from "react";

import Header from "./Header";
export default function Layout({ children }) {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <div className="max-w-screen-sm mx-auto antialiased font-body py-24 px-4">
        <main>{children}</main>
        <footer className="text-lg font-light">
          © {new Date().getFullYear()}, Built with{" "}
          <a href="https://nextjs.org/">Next.js</a>
          &#128293;
        </footer>
      </div>
    </Fragment>
  );
}
