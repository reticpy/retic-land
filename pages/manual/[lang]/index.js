import ReactMarkdown from "react-markdown/with-html";
import Link from "next/link";
import Layout from "components/Layout";
import SEO from "components/Seo";

import { getContentFile, getSlugs } from "utils/posts";
const LinkTo = ({ text, url }) => {
  return (
    <Link href={url}>
      <a className="text-4xl font-bold text-orange-600 font-display">{text}</a>
    </Link>
  );
};
export default function Lang({ content, frontmatter }) {
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

export async function getStaticPaths() {
  //add paths
  const paths = getSlugs(false);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { lang } }) {
  //get file from default languages
  const postData = getContentFile(
    "introduction.md",
    `${process.cwd()}/content/manual/${lang}/introduction.md`
  );
  return { props: postData };
}
