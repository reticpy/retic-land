import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

/**
 * Component Link using next/link
 * @param {*} param0
 */
export const LinkTo = ({ title, href, children }) => {
  //if tithe doesn't exist, using nomral <a>
  if (!title)
    return (
      <a target="_blank" href={href} className="font-bold">
        {children}
      </a>
    );
  else
    return (
      <Link href={title} as={href}>
        <a className="font-bold">{children}</a>
      </Link>
    );
};

export const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};
