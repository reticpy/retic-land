import ReactMarkdown from "react-markdown/with-html";
import Link from "next/link";
import Layout from "components/Layout";
import SEO from "components/Seo";

import { getContentFile } from "utils/posts";
const LinkTo = ({ href, children }) => {
  return (
    <Link href={`/manual/[lang]`} as={href}>
      <a className="text-4xl font-bold text-orange-600 font-display">
        {children}
      </a>
    </Link>
  );
};
export default function Manual({ content, frontmatter }) {
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
        </header>
        <ReactMarkdown
          className="mb-4 prose-sm prose sm:prose lg:prose-lg"
          escapeHtml={false}
          source={content}
          renderers={{ link: LinkTo }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  //get file from default languages
  const postData = getContentFile(
    "languages.md",
    `${process.cwd()}/content/manual/es/languages/languages.md`
  );
  return { props: postData };
}
